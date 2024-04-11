'use client';

import cloudinary from '@/db/cloudinary';
import { Category } from '@/interfaces';
import { AdvancedImage, responsive } from '@cloudinary/react';
import { pad, thumbnail } from '@cloudinary/url-gen/actions/resize';
import Link from 'next/link';
import React from 'react';

const BentoCategoryCard = ({
  category,
  url,
}: {
  category: Category;
  url: string;
}) => {
  const myCld = cloudinary;
  const bentoImg = myCld.image(category.bentoUrls[1]);
  bentoImg.resize(thumbnail().width(400)).format('auto');

  const bentoImg2 = myCld.image(category.bentoUrls[0]);
  bentoImg.resize(thumbnail().width(400)).format('auto');

  return (
    <Link
      className='bg-white 
    w-300px 
    h-200px 
    border 
    rounded-lg
    flex 
    items-center 
    justify-center
    text-2xl
    font-roboto
    relative
    overflow-hidden
    '
      href={url}
    >
      <AdvancedImage
        className='absolute object-cover brightness-50 -z-11 '
        cldImg={bentoImg2}
        plugins={[responsive()]}
      />
      <AdvancedImage
        className='absolute object-cover brightness-50 -z-11 hover:opacity-0 
        transition ease-in-out duration-500'
        cldImg={bentoImg}
        plugins={[responsive()]}
      />

      <div className='z-10 text-white pointer-events-none'>{category.name}</div>
    </Link>
  );
};

export default BentoCategoryCard;
