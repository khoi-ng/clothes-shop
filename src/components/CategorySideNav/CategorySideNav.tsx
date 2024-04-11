'use client';

import { Gender } from '@/interfaces';
import React, { useLayoutEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { GiHamburgerMenu } from 'react-icons/gi';

const CategorySideNav = ({ genderObject }: { genderObject: Gender }) => {
  const gender = genderObject.name.toLocaleLowerCase();
  const [isHidden, setIsHidden] = useState(true);

  return (
    <div className='relative'>
      <button
        className='text-3xl'
        hidden={!isHidden}
        onClick={() => setIsHidden(false)}
      >
        <GiHamburgerMenu />
      </button>
      <nav
        className=' border px-10 pt-2 min-w-60 text-sm hidden'
        style={isHidden ? { display: 'none' } : { display: 'block' }}
      >
        <h2 className='text-2xl pb-2 bold relative flex'>
          Categories
          <div className='absolute text-2xl -right-10 -top-2 '>
            <button onClick={() => setIsHidden(true)}>
              <IoMdClose />
            </button>
          </div>
        </h2>
        {genderObject.categories?.map((category, index) => (
          <div key={`${category}-categories-${index}`} className='py-1 card'>
            <a href={`/products/${gender}/${category.uriName}`}>
              {category.name}
            </a>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default CategorySideNav;
