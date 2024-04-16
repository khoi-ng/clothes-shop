'use client';
import { FaShoppingCart } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useEffect, useRef, useState } from 'react';
import { useMotionValueEvent, useScroll, motion } from 'framer-motion';
import { CartStorage, getCart } from '@/db/sessionStorageCart';
import { useCartContext } from '@/Context/ItemCartProvider';

const NavAnimations = {
  initial: {
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    top: 0,
    transition: {
      type: 'spring',
      damping: 10,
      stiffness: 100,
      delay: 0,
    },
  },
  exit: {
    // y: -50,
    top: -50,
    opacity: 0,
  },
};

export default function Navbar({
  fontColor = 'text-white',
  backgroundColor = 'bg-transparent',
}) {
  const [isScrolling, setIsScrolling] = useState(false);

  const { scrollY } = useScroll();
  const [cart, _] = useCartContext();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    // console.log('Page scroll: ', latest);
    // need to be specific bcs dont want to trigger redraw all the time
    if (latest >= 40 && !isScrolling) {
      setIsScrolling(true);
    } else if (latest === 0 && isScrolling) {
      setIsScrolling(false);
    }
  });

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
  // no need for animate presence, redraw will notice the key change and start the animation
  return (
    <motion.nav
      // initial='initial'
      animate='animate'
      exit='exit'
      key={`scroll-Navbar-${isScrolling}`}
      variants={NavAnimations}
      className={`
      flex ${fontColor}  z-4 justify-between z-30 items-center  xl:px-24 sm:px-12 px-4
      ${
        isScrolling
          ? 'w-[calc(100%-30px)] -top-24 fixed my-2 mx-6 rounded-full bg-[rgba(11,11,11,0.7)] backdrop-blur-md h-20 shadow-[0_8px_32px_0_ring-gray-50]'
          : `w-full fixed ${backgroundColor} h-24`
      } 
      `}
    >
      <a href='/' className='text-5xl flex gap-x-4 font-rocknroll'>
        Clothes
      </a>

      <div
        ref={menuRef}
        className={`text-2xl flex-col flex gap-x-12 justify-center font-roboto 
         
        shadow-menuShadow
      relative
      max-lg:-right-full
      max-lg:w-1/2 
      
      ${
        isScrolling
          ? 'rounded-3xl max-lg:bg-[rgba(11,11,11,1)]'
          : 'max-lg:bg-[rgba(0,0,0,1)]'
      }
      max-lg:h-screen
      max-lg:fixed 
      max-lg:top-0
      max-lg:pl-24 
      max-lg:pt-12 
      transition-[right]
      duration-500
      max-sm:w-4/5
      
      `}
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
            <a
              className='hover:underline'
              href='https://github.com/khoi-ng/clothes-shop'
            >
              Github
            </a>
          </li>
          <li>
            <a className='hover:underline' href='mailto:KhoiNG123@t-online.de'>
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
        <a href='/cart' className='relative'>
          <FaShoppingCart className='cursor-pointer' />
          <span className='absolute -top-3  -left-3 rounded-full bg-[#438cb6]  text-xs w-7 h-7 text-center '>
            <p className='flex items-center justify-center h-full font-semibold'>
              {cart.quantity <= 99 ? cart.quantity : '+99'}
            </p>
          </span>
        </a>

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
    </motion.nav>
  );
}
