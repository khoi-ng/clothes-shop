'use client';
import { FaShoppingCart } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useRef } from 'react';

const Navbar = ({
  fontColor = 'text-white',
  backgroundColor = 'bg-transparent',
}) => {
  const menuRef = useRef<HTMLDivElement | null>(null);
  function closeMenu() {
    if (menuRef.current) {
      menuRef.current.classList.remove('max-lg:right-0');
    }
  }

  function toggleMenu() {
    if (menuRef.current) {
      menuRef.current.classList.add('max-lg:right-0');
    }
  }

  return (
    <nav
      className={`absolute flex ${fontColor} w-full ${backgroundColor} z-4 justify-between z-30 items-center h-24 xl:px-24 px-12 0`}
    >
      <a href='/' className='text-5xl flex gap-x-4 font-rocknroll'>
        Clothes
      </a>

      <div
        ref={menuRef}
        className='text-2xl flex-col flex gap-x-12 justify-center font-roboto 
         
        shadow-menuShadow
      relative
      max-lg:-right-full
      max-lg:w-1/2 
      max-lg:bg-black
      max-lg:h-screen
      max-lg:fixed 
      max-lg:top-0
      max-lg:pl-24 
      max-lg:pt-12 
      transition-[right]
      duration-500
      max-sm:w-4/5
      
      '
      >
        <ul className='flex max-lg:flex-col gap-12 font-semibold'>
          <li>
            <a className='hover:underline' href='/'>
              Home
            </a>
          </li>
          <li>
            <a className='hover:underline' href='/products/MEN'>
              Men
            </a>
          </li>
          <li>
            <a className='hover:underline' href='/products/WOMEN'>
              Women
            </a>
          </li>
          <li>
            <a className='hover:underline' href='#'>
              Github
            </a>
          </li>
          <li>
            <a className='hover:underline' href='#'>
              Contact
            </a>
          </li>
        </ul>

        <div className='text-white text-2xl absolute top-5 right-6 hidden max-lg:block'>
          <IoMdClose
            onClick={() => {
              closeMenu();
            }}
          />
        </div>
      </div>

      <div className='text-3xl flex gap-x-2'>
        <FaShoppingCart className='cursor-pointer' />
        <FaHeart className='cursor-pointer' />

        <div className='nav__toogle hidden max-lg:flex' id='nav-toggle'>
          <GiHamburgerMenu
            className='cursor-pointer'
            onClick={() => {
              toggleMenu();
            }}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
