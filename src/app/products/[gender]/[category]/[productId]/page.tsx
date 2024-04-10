import { notFound } from 'next/navigation';
import prisma from '@/db/prisma';
import cloudinary from '@/db/cloudinary';
import { thumbnail } from '@cloudinary/url-gen/actions/resize';
import { AdvancedImage, responsive } from '@cloudinary/react';
import ProductComponent from '../../../../../components/ProductComponent/ProductComponent';
import { Products } from '@/interfaces';

const getProduct = async (id: string) => {
  const product = await prisma.product.findFirst({
    where: {
      id: id,
    },
    select: {
      id: true,
      name: true,
      imageUrl: true,
      description: true,
      price: true,
      createdAt: true,
    },
  });
  return product;
};

export default async function Category({
  params,
}: {
  params: { gender: string; category: string; productId: string };
}) {
  const product = await getProduct(params.productId);
  if (product) {
    const productObj: Products = JSON.parse(JSON.stringify(product));

    return (
      <section className='bg-black pt-24 text-white px-24'>
        <h2 className='text-4xl'>Product {product.name}</h2>
        <ProductComponent product={productObj} />
      </section>
    );
  }
  notFound();
}
