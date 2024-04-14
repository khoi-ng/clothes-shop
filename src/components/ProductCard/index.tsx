'use client';

import cloudinary from '@/db/cloudinary';
import { Products } from '@/interfaces';
import { AdvancedImage, responsive } from '@cloudinary/react';
import { thumbnail } from '@cloudinary/url-gen/actions/resize';
import Link from 'next/link';
import React from 'react';

const ProductCard = ({ product, url }: { product: Products; url: string }) => {
  const myCld = cloudinary;
  const productIMG = myCld.image(product.imageUrl);
  productIMG.resize(thumbnail().width(500)).format('auto');

  return (
    <Link
      href={url}
      className='bg-white 
        w-[300px] 
        h-[380px] 
        
        rounded 
        p-5
        items-center 
        justify-center
       
        font-roboto
        shadow-sm
        hover:shadow-xl hover:shadow-gray-100 transition-all
        '
    >
      <div className='  h-[250px]  w-full flex items-center justify-center mb-3'>
        <AdvancedImage
          className='object-contain h-full hover:scale-105 transition-all'
          cldImg={productIMG}
          plugins={[responsive()]}
        />
      </div>
      <div>
        <h3 className='font-semibold truncate'>{product.name}</h3>
        <p className='text-gray-600 text-sm truncate '>
          {product.description ? product.description : 'No Description yet'}
        </p>
        <div className='text-right pt-4'>
          <span className='font-semibold'>{product.price}€</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
