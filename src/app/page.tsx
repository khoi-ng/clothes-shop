'use client';

import Header from '@/components/Header';
import { AdvancedImage, responsive } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { thumbnail } from '@cloudinary/url-gen/actions/resize';
import { FaShoppingCart } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';

export default function Home() {
  const myCld = new Cloudinary({
    cloud: {
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME,
    },
  });

  const mainHeaderImg = myCld.image('Demo-Shop/mainHeaderDarkend');
  mainHeaderImg.resize(thumbnail().width(900)).format('auto');

  const headerImg2 = myCld.image('Demo-Shop/header2');
  headerImg2.resize(thumbnail().width(900)).format('auto');

  const headerImg3 = myCld.image('Demo-Shop/header3');
  headerImg3.resize(thumbnail().width(900)).format('auto');

  return (
    // Landing page

    <main className=''>
      <header className='w-full h-screen '>
        <nav className='fixed flex text-white w-full bg-transparent z-4 justify-between z-30 items-center h-24 px-24 '>
          <a
            href=''
            className='text-5xl text-white flex gap-x-4 font-rocknroll'
          >
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

        <section className='w-full h-screen bg-black'>
          <div className='flex items-end'>
            <AdvancedImage
              className='h-2/5 w-auto absolute right-1/4 bottom-0'
              cldImg={headerImg2}
              plugins={[responsive()]}
            />{' '}
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
            <div className='absolute -rotate-[95deg] text-8xl -left-20 bottom-1/3 text-white z-10 font-oswald font-normal'>
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
      <section className='w-full'>
        <div className='relative w-full h-auto'>
          <svg
            className='w-full absolute h-auto -translate-y-1/2'
            width='1920'
            height='265'
            viewBox='0 0 1920 265'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <rect
              width='2594'
              height='135.233'
              transform='translate(-300 129.445) rotate(-2.86034)'
              fill='#737771'
            />
          </svg>
        </div>
      </section>
    </main>
  );
}
