'use client';
import { FaShoppingCart } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';

const Navbar = () => {
  return (
    <nav className='fixed flex text-white w-full bg-transparent z-4 justify-between z-30 items-center h-24 px-24 '>
      <a href='' className='text-5xl text-white flex gap-x-4 font-rocknroll'>
        Clothes
      </a>

      <div>
        <ul className='text-2xl text-white flex gap-x-12 justify-center font-roboto'>
          <li>
            <a href='/'>Home</a>
          </li>
          <li>
            <a href='/products/MEN'>Men</a>
          </li>
          <li>
            <a href='/products/WOMEN'>Women</a>
          </li>
          <li>
            <a href='#'>News</a>
          </li>
          <li>
            <a href='#'>Contact</a>
          </li>
        </ul>
      </div>

      <div className='text-3xl text-white flex gap-x-2'>
        <FaShoppingCart className='cursor-pointer' />
        <CgProfile className='cursor-pointer' />
      </div>
    </nav>
  );
};

export default Navbar;
