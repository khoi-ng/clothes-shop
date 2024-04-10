'use client';
import cloudinary from '@/db/cloudinary';
import { thumbnail } from '@cloudinary/url-gen/actions/resize';
import { AdvancedImage, responsive } from '@cloudinary/react';
import { Products } from '@/interfaces';
import { Cloudinary } from '@cloudinary/url-gen/index';

const ProductComponent = ({ product }: { product: Products }) => {
  const myCld = cloudinary;

  const productImg = myCld.image(product.imageUrl);

  // productImg.resize(thumbnail().width(900)).format('auto');

  return (
    <div>
      <AdvancedImage
        className='h-64 '
        cldImg={productImg}
        plugins={[responsive()]}
        alt='adf_image'
      />
      <div>
        <h2 className='text-3xl'>{product.name}</h2>
        <p>{product.price}€</p>
        <p>
          {product.description ? product.description : 'no Description yet'}
        </p>
      </div>
    </div>
  );
};

export default ProductComponent;
