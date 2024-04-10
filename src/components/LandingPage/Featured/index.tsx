'use client';

import React from 'react';
import SwiperSlideCarousel from '@/components/Swiper/SwiperSlideCarousel';
import './Featured.scss';

const index = ({ featuredProducts }: { featuredProducts: string }) => {
  return (
    <section className='feature-landing w-full h-auto pb-28 '>
      <div className='svg-content-seperator text-9xl relative z-10'>
        <div className='relative w-full '>
          <svg
            className='w-full absolute h-auto -translate-y-1/2 mb-28 '
            width='1920'
            height='265'
            viewBox='0 0 1920 265'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            preserveAspectRatio='none'
          >
            <rect
              width='2594'
              height='135.233'
              transform='translate(-300 129.445) rotate(-2.86034)'
              fill='#737771'
            />
          </svg>
        </div>
      </div>
      <article className='px-0 md:px-24 relative z-0'>
        <div className='relative  px-12'>
          {/* bg-slate-600 */}

          <span
            className='bg-landing3  text-5xl font-oswald absolute -top-12 -rotate-6 py-6 z-0 
            sm:text-6xl
            md:text-7xl md:p-8 md:py-9 md:-top-16 
            lg:text-8xl lg:p-9 lg:py-10  lg:-top-18
            xl:text-8xl xl:p-9 xl:pl-12  xl:-top-12
           '
          >
            <div
              className='relative left-5 rotate-6 top-2 
              opacity-0
               md:left-16 md:top-4
               lg:left-24 lg:top-2
               xl:left-32 xl:top-2
               '
            >
              New C<span className='text-slate-50'>o</span>
              llec
            </div>
          </span>

          <div
            className='absolute
            text-5xl font-oswald -top-12 p-5 py-6 z-0 
            sm:text-6xl
            md:text-7xl md:p-8 md:py-9 md:-top-14  md:left-12
            lg:text-8xl lg:p-9 lg:py-10  lg:-top-18 lg:left-12
            xl:text-8xl xl:p-9 xl:pl-12  xl:-top-12 xl:left-16
            '
          >
            New C<span className='text-slate-50'>o</span>
            llection
          </div>

          <div className='h-24' />
        </div>

        <div className='h-full w-full flex items-center justify-center  relative '>
          <SwiperSlideCarousel items={featuredProducts} />
        </div>
      </article>
    </section>
  );
};

export default index;
