'use client';
import { AdvancedImage, responsive } from '@cloudinary/react';
import { thumbnail } from '@cloudinary/url-gen/actions/resize';
import { FaShoppingCart } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import cloudinary from '@/db/cloudinary';

const Header = () => {
  const myCld = cloudinary;

  const mainHeaderImg = myCld.image('Demo-Shop/mainHeaderDarkend');
  mainHeaderImg.resize(thumbnail().width(900)).format('auto');

  const headerImg2 = myCld.image('Demo-Shop/header2');
  headerImg2.resize(thumbnail().width(900)).format('auto');

  const headerImg3 = myCld.image('Demo-Shop/header3');
  headerImg3.resize(thumbnail().width(900)).format('auto');

  return (
    <header className='w-full h-screen '>
      <nav className='fixed flex text-white w-full bg-transparent z-4 justify-between z-30 items-center h-24 px-24 '>
        <a href='' className='text-5xl text-white flex gap-x-4 font-rocknroll'>
          Clothes
        </a>

        <div>
          <ul className='text-2xl text-white flex gap-x-12 justify-center font-roboto'>
            <li>
              <a href='#'>Home</a>
            </li>
            <li>
              <a href='#'>Men</a>
            </li>
            <li>
              <a href='#'>Women</a>
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

      <section className='w-full h-full bg-black'>
        <div className='flex items-end'>
          <AdvancedImage
            className='h-2/5 w-auto absolute right-1/4 bottom-0'
            cldImg={headerImg2}
            plugins={[responsive()]}
          />
          <AdvancedImage
            className='h-3/5 w-auto absolute right-2/4 bottom-0'
            cldImg={headerImg3}
            plugins={[responsive()]}
          />
          <AdvancedImage
            className='h-screen w-auto absolute right-0 top-0'
            cldImg={mainHeaderImg}
            plugins={[responsive()]}
          />
          <div className='header-title absolute -rotate-[95deg] -left-20 bottom-1/3 text-white z-10 font-oswald font-normal'>
            <h1>
              L
              <span className='text-headeryellow font-oswald font-normal'>
                OO
              </span>
              K BETTER AND
            </h1>
            <h1>LIVE BETTER</h1>
          </div>
        </div>
      </section>
    </header>
  );
};

export default Header;
