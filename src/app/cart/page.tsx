import ShoppingCart from '@/components/ShoppingCart/ShoppingCart';
import React from 'react';

const page = () => {
  //  Read Session Storage

  //  Look in DB for Articles

  //  Display the items

  //  Add delete & quantity functionality

  return (
    <section className=' max-md:mx-6 mx-24 pt-36 '>
      <h2 className='text-2xl sm:text-3xl pb-4 font-semibold capitalize'>
        Shopping Cart
      </h2>
      <ShoppingCart />
    </section>
  );
};

export default page;
