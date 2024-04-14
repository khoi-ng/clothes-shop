'use client';

import { Gender } from '@/interfaces';
import React, { useLayoutEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { GiHamburgerMenu } from 'react-icons/gi';

const CategorySideNav = ({ genderObject }: { genderObject: Gender }) => {
  const gender = genderObject.name.toLocaleLowerCase();
  const [isHidden, setIsHidden] = useState(true);

  return (
    <div className='relative  max-md:self-end max-md:mb-4 max-md:w-full '>
      <button
        className='text-3xl'
        hidden={!isHidden}
        onClick={() => setIsHidden(false)}
      >
        <GiHamburgerMenu />
      </button>
      <nav
        className=' rounded-lg px-10 pt-2 min-w-60 hidden text-sm bg-slate-100 text-slate-800 pb-6 '
        style={isHidden ? { display: 'none' } : { display: 'block' }}
      >
        <h2 className='text-2xl pb-4 font-semibold relative flex '>
          <a href={`/products/${gender}`}>Categories</a>
          <div className='absolute text-2xl -right-4 top-1 '>
            <button onClick={() => setIsHidden(true)}>
              <IoMdClose />
            </button>
          </div>
        </h2>
        {genderObject.categories?.map((category, index) => (
          <div
            key={`${category}-categories-${index}`}
            className='py-1 card font-medium'
          >
            <a
              href={`/products/${gender}/${category.uriName}`}
              className='hover:underline'
            >
              {category.name}
            </a>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default CategorySideNav;
