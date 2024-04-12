'use client';
import gsap from 'gsap';
import React from 'react';
import SwiperSlideCarousel from '@/components/Swiper/SwiperSlideCarousel';
import './Featured.scss';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(ScrollTrigger);

const Featured = ({ featuredProducts }: { featuredProducts: string }) => {
  useGSAP(() => {
    gsap.set('#newCollectionTitleBg', {
      opacity: 0,
      y: -100,
    });
    gsap.set('#newCollectionTitle span', {
      opacity: 0,
    });
    gsap.set('.feature-carousel-wrapper', {
      opacity: 0,
      y: 500,
    });

    const timelineScrollTitle = gsap
      .timeline({
        defaults: {
          immediateRender: false,
        },
        scrollTrigger: {
          trigger: '.feature-landing',
          start: 'top 78%',
        },
      })
      .to(['#newCollectionTitleBg'], {
        y: 0,
        opacity: 1,
        ease: 'expo.out',
        duration: 2,
        stagger: 0.07,
      })
      .to(
        ['#newCollectionTitle span'],
        {
          y: 0,
          opacity: 1,
          ease: 'expo.out',
          duration: 2,
          stagger: 0.03,
        },
        0.4
      );

    const timelineScrollCarousel = gsap
      .timeline({
        defaults: {
          immediateRender: false,
        },
        scrollTrigger: {
          trigger: '.feature-landing',
          start: 'top 65%',
        },
      })

      .to(
        ['.feature-carousel-wrapper'],
        {
          y: 0,
          opacity: 1,
          duration: 2,
          ease: 'power3.out',
          stagger: 0.01,
        },
        0
      );
  });

  return (
    <section className='feature-landing w-full h-auto pb-28 relative z-1'>
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
        <div id='newCollectionTitleBg' className='relative  px-12'>
          {/* bg-slate-600 */}

          <span
            className='  bg-landing3  text-5xl font-oswald absolute -top-12 -rotate-6 py-6 z-0 
            sm:text-6xl
            md:text-7xl md:p-8 md:py-9 md:-top-16 
            lg:text-8xl lg:p-9 lg:py-10  lg:-top-18
            xl:text-8xl xl:p-9 xl:pl-12  xl:-top-12
           '
          >
            <div
              className='relative 
              left-5 
              rotate-6 
              top-2 
              opacity-0
               md:left-16 md:top-4
               lg:left-24 lg:top-2
               xl:left-32 xl:top-2
               '
            >
              New Collection
            </div>
          </span>

          <div
            id='newCollectionTitle'
            className='
            absolute
            text-5xl font-oswald -top-12 p-5 py-6 z-0 
            sm:text-6xl
            md:text-7xl md:p-8 md:py-9 md:-top-14  md:left-12
            lg:text-8xl lg:p-9 lg:py-10  lg:-top-18 lg:left-12
            xl:text-8xl xl:p-9 xl:pl-12  xl:-top-12 xl:left-16 
            '
          >
            <span className='opacity-0'>N</span>
            <span className='opacity-0'>e</span>
            <span className='opacity-0'>w</span>
            <span className='opacity-0'> </span>
            <span className='opacity-0'>C</span>
            <span className='text-slate-50 opacity-0'>o</span>
            <span className='opacity-0'>l</span>
            <span className='opacity-0'>l</span>
            <span className='opacity-0'>e</span>
            <span className='opacity-0'>c</span>
            <span className='opacity-0'>t</span>
            <span className='opacity-0'>i</span>
            <span className='opacity-0'>o</span>
            <span className='opacity-0'>n</span>
          </div>

          <div className='h-24' />
        </div>

        <div className='feature-carousel-wrapper h-full w-full flex items-center justify-center  relative opacity-0'>
          <SwiperSlideCarousel items={featuredProducts} />
        </div>
      </article>
    </section>
  );
};

export default Featured;
