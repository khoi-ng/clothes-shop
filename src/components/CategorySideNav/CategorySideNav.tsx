'use client';

import { Gender } from '@/interfaces';
import React, { useLayoutEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { GiHamburgerMenu } from 'react-icons/gi';

import { motion } from 'framer-motion';

const variants = {
  open: {
    // transition: { duration: 0, ease: [0.76, 0, 0.24, 1] },
    width: 'auto',
    minWidth: '15rem',
    height: 'auto',
    top: '-40px',
    left: '-2px',
    paddingBottom: '1.5rem',
    paddingTop: '2.5rem',
    paddingLeft: '2.5rem',
    // paddingRight: '4.5rem',
  },
  close: {
    // transition: { duration: 0, ease: [0.76, 0, 0.24, 1] },
    width: '38px',
    height: '38px',
    top: '-38px',
    left: '10px',

    //
  },
};

const CategorySideNav = ({ genderObject }: { genderObject: Gender }) => {
  const gender = genderObject.name.toLocaleLowerCase();
  const [isHidden, setIsHidden] = useState(true);
  const [isActive, setIsActive] = useState(false);

  return (
    <div className='relative  max-md:self-end max-md:mb-4 max-md:w-full -top-2 max-md:top-0 max-md:-left-2'>
      <button
        className='relative z-10 text-3xl  overflow-hidden mt-1 rounded-xl  top-2 left-2'
        // hidden={!isHidden}
        onClick={() => setIsActive(!isActive)}
      >
        <motion.div
          className='group relative w-full h-full rounded-xl'
          animate={{ top: isActive ? '-38px' : '0' }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className='  text-white  bg-[#030303] p-1  w-full h-full'>
            <GiHamburgerMenu />
          </div>
          <div className='absolute  bg-[bg-slate-100] p-1  top-100% w-full h-full'>
            <IoMdClose />
          </div>
        </motion.div>
      </button>
      <motion.nav
        animate={isActive ? 'open' : 'close'}
        initial='close'
        variants={variants}
        className='relative z-0 rounded-lg  text-sm bg-slate-100 text-slate-800 '
      >
        <div style={!isActive ? { display: 'none' } : { display: 'block' }}>
          <h2 className='text-2xl pb-4 font-semibold relative flex '>
            <a href={`/products/${gender}`}>Categories</a>
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
        </div>
      </motion.nav>
    </div>
  );
};

export default CategorySideNav;
