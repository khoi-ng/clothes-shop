import { notFound } from 'next/navigation';
import prisma from '@/db/prisma';
import cloudinary from '@/db/cloudinary';
import { thumbnail } from '@cloudinary/url-gen/actions/resize';
import { AdvancedImage, responsive } from '@cloudinary/react';
import Product from '../../../../../components/Product/Product';
import { ICategory, Products } from '@/interfaces';
import { getCategoryByID, getProduct } from '@/db/prismaOperation';

export default async function Category({
  params,
}: {
  params: { gender: string; category: string; productId: string };
}) {
  const product = await getProduct(params.productId);

  if (product && product.categoryId) {
    const productObj: Products = JSON.parse(JSON.stringify(product));

    const category = await getCategoryByID(product?.categoryId);
    const categoryObject: ICategory | null = await JSON.parse(
      JSON.stringify(category)
    );

    if (!categoryObject) {
      notFound();
    }

    return (
      <section className=' text-black sm:mx-5 md:mx-10 pb-20 w-full'>
        <h2 className='text-2xl sm:text-3xl pb-4 font-semibold capitalize'>
          Product {product.name}
        </h2>
        <Product product={productObj} category={categoryObject} />
      </section>
    );
  }
  notFound();
}
