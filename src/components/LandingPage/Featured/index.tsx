'use client';

import React from 'react';
import SwiperSlideCarousel from '@/components/Swiper/SwiperSlideCarousel';

const index = ({ featuredProducts }: { featuredProducts: string }) => {
  return (
    <section className='feature-landing w-full h-auto'>
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
      <div className='h-full w-full flex items-center justify-center  relative py-20'>
        <SwiperSlideCarousel items={featuredProducts} />
      </div>
    </section>
  );
};

export default index;
