'use client';
import cloudinary from '@/db/cloudinary';
import { thumbnail } from '@cloudinary/url-gen/actions/resize';
import { AdvancedImage, responsive } from '@cloudinary/react';
import { ICategory, Products } from '@/interfaces';
import { Cloudinary } from '@cloudinary/url-gen/index';

const Product = ({
  product,
  category,
}: {
  product: Products;
  category: ICategory;
}) => {
  const otherProducts = category.products.filter(
    (catproduct) => catproduct.id !== product.id
  );
  // console.log(otherProducts);

  const myCld = cloudinary;

  const productImg = myCld.image(product.imageUrl);

  // productImg.resize(thumbnail().width(900)).format('auto');

  return (
    <>
      <div className='flex flex-col md:flex-row sm sm:gap-8'>
        <div
          className='flex item-center justify-center 
      max-w-[450px] max-h-[450px] w-[450px] h-[450px] rounded-xl shadow-2xl shadow-gray-200 bg-white'
        >
          <AdvancedImage
            className='max-h-[450px] max-w-[450px] p-9 m-auto'
            cldImg={productImg}
            plugins={[responsive()]}
            alt='adf_image'
          />
        </div>
        <div className='py-4 flex justify-between flex-col'>
          <div>
            <h2 className='text-3xl sm:text-5xl font-bold animate-fadein'>
              {product.name}
            </h2>
            <p className='max-w-xl py-4 text-lg'>
              {product.description ? (
                product.description
              ) : (
                <>
                  <span className='pb-20 w-full'>no Description yet</span>
                  <br />
                  <span>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Labore consectetur adipisci reiciendis qui ullam veritatis
                    atque voluptate, nemo culpa nisi, libero quam quia incidunt
                    delectus recusandae inventore? In, error qui.
                  </span>
                </>
              )}
            </p>
          </div>
          <div className='pt-2 sm:pt-8 text-right'>
            <p className='text-4xl font-semibold'>{product.price}€</p>
            <button className='mt-4 px-5 py-2 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-full'>
              Add to cart
            </button>
          </div>
        </div>
      </div>
      <div className='py-3 md:py-10'></div>
      <h4 className='font-bold text-lg pb-6'>You might also like</h4>

      <div className='flex flex-wrap justify-center sm:justify-normal gap-4 w-full'>
        {otherProducts.map((otherProduct) => {
          const otherProductIMG = myCld.image(otherProduct.imageUrl);

          return (
            <a
              href={`${otherProduct.id}`}
              key={`${otherProduct.id}-product-key`}
              className='bg-white w-[250px] rounded-lg        items-center justify-center font-roboto   shadow-sm   hover:shadow-xl hover:shadow-gray-100 transition-all gap-2'
            >
              <article className='flex-col  rounded-lg    '>
                <div className='flex  p-10 pb-3 m-auto h-[250px]'>
                  <AdvancedImage
                    className='object-contain h-full hover:scale-105 transition-all m-auto'
                    cldImg={otherProductIMG}
                    plugins={[responsive()]}
                    alt='adf_image'
                  />
                </div>

                <div className='flex flex-col p-6  mt-auto rounded-lg    '>
                  <h3 className='font-semibold truncate'>
                    {otherProduct.name}
                  </h3>
                  <p className='text-gray-600 text-sm truncate'>
                    {otherProduct.description
                      ? otherProduct.description
                      : 'No Description yet'}
                  </p>
                  <div className='text-right mt-4'>
                    <span className='font-semibold'>{otherProduct.price}</span>
                  </div>
                </div>
              </article>
            </a>
          );
        })}
      </div>
    </>
  );
};

export default Product;
