'use client';

import React from 'react';
import './CheckoutMore.scss';
import menImg from '../../../app/assets/img/mahdi-bafande-XCU9ZV_ys5w-unsplash.webp';
import womenImg from '../../../app/assets/img/alireza-dolati-OVS3rqXq9gg-unsplash.webp';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { HoverImageBlockyEffect } from '@/components/HoverImageEffects/HoverImageBlockyEffect';

gsap.registerPlugin(ScrollTrigger);

const CheckoutMore = () => {
  useGSAP(() => {
    gsap.set(['.checkoutTitleBg'], {
      y: -110,
      opacity: 0,
    });

    gsap.set('#checkoutTitle span', {
      opacity: 0,
    });

    gsap.set('#womenMenFashionWrapper', {
      opacity: 0,
      y: 500,
    });

    const timelineScrollTitle = gsap
      .timeline({
        defaults: {
          immediateRender: false,
        },
        scrollTrigger: {
          trigger: '.landing-check-more',
          start: 'top 80%',
          end: 'center 50%',
          scrub: true,
          // markers: true,
        },
      })
      .to(['.checkoutTitleBg'], {
        y: 0,
        opacity: 1,
        ease: 'expo.out',
        duration: 1.5,
        stagger: 0.07,
      })
      .to(
        ['#checkoutTitle span'],
        {
          y: 0,
          opacity: 1,
          ease: 'expo.out',
          duration: 2,
          stagger: 0.03,
        },
        0.4
      );

    const timelineGenderFashion = gsap
      .timeline({
        defaults: {
          immediateRender: false,
        },
        scrollTrigger: {
          trigger: '.landing-check-more',
          start: 'top 90%',
          end: '50% 50%',
          scrub: true,
          // markers: true,
        },
      })
      .to('#womenMenFashionWrapper', {
        opacity: 1,
        y: 0,
      });
  });

  return (
    <section className='landing-check-more bg-checkout '>
      <div className='svg-content-seperator text-9xl relative z-10'>
        <div className='relative w-full '>
          <svg
            className='w-full absolute h-auto -translate-y-1/2 mb-28 '
            width='1920'
            height='227'
            viewBox='0 0 1920 227'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            preserveAspectRatio='none'
          >
            <rect
              width='2594'
              height='135.233'
              transform='translate(-247.233) rotate(2.02)'
              fill='#A09999'
            />
          </svg>{' '}
        </div>
      </div>

      <article className='w-full p-12 md:p-24 '>
        <div className='relative '>
          {/* bg-slate-600 */}

          <span
            className='checkoutTitleBg
            bg-landing3  text-6xl font-oswald absolute -top-32  rotate-5 py-6 z-0  right-1/3
            sm:text-6xl  sm:-top-30  
            md:text-7xl md:p-8 md:py-9 md:-top-40       md:right-1/3
            lg:text-8xl lg:p-9 lg:py-10  lg:-top-40     lg:right-1/4
            xl:text-8xl xl:p-9 xl:pl-12  xl:-top-40     xl:right-1/4
           '
          >
            <div className='opacity-0 '>FILLLLLL</div>
          </span>

          <div
            id='checkoutTitle'
            className='absolute text-slate-50
            text-4xl font-oswald -top-20  z-0  right-1/3
            sm:text-4xl     sm:-top-30  
            md:text-6xl  md:py-9   md:-top-40  md:right-1/3
            lg:text-8xl  lg:py-10  lg:-top-40   lg:right-1/4
            xl:text-8xl  xl:pl-1  xl:-top-40  xl:right-1/4
            '
          >
            <span>C</span>
            <span>h</span>
            <span>e</span>
            <span>c</span>
            <span>k</span>
            <span> </span>
            <span className='text-headeryellow'>Out</span>
            <span> </span>
            <span>M</span>
            <span>o</span>
            <span>r</span>
            <span>e</span>
          </div>

          <div className='h-2 md:h-14 lg:h-24' />
        </div>

        <div className='relative overflow-hidden'>
          <div
            id='womenMenFashionWrapper'
            className='md:flex  justify-center items-center '
          >
            <div className=' bg-menContainer p-10 lg:p-20 md:pr-0 lg:pr-0 flex flex-col justify-end font-oswald '>
              <div className='pb-10'>
                <h2 className='text-5xl  md:text-5xl lg:text-7xl text-slate-200'>
                  Men Fashion&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </h2>
              </div>
              <a
                className='max-h-[700px]  w-auto relative saturate-0 hover:saturate-100 transition ease-in-out duration-500'
                href='/products/men'
                id='menFashionImgLink'
              >
                <Image
                  className='max-h-[700px]  w-auto invisible'
                  src={womenImg}
                  alt='women'
                ></Image>

                <HoverImageBlockyEffect
                  className='w-full h-full top-0 !absolute'
                  img={menImg}
                  aspectRatio={[1, 1.5]}
                  parentId='menFashionImgLink'
                ></HoverImageBlockyEffect>
              </a>
            </div>

            <div className='bg-womenContainer p-10 lg:p-20 md:pl-0 lg:pl-0 font-oswald'>
              <div className='pb-10 pl-3'>
                <h2 className='text-5xl md:text-5xl lg:text-7xl'>
                  Women Fashion
                </h2>
              </div>
              <a
                className='max-h-[700px]  w-auto relative saturate-0 hover:saturate-100 transition ease-in-out duration-500'
                href='/products/women'
                id='womenFashionImgLink'
              >
                <Image
                  className='max-h-[700px]  w-auto invisible'
                  src={womenImg}
                  alt='women'
                ></Image>

                <HoverImageBlockyEffect
                  className='w-full h-full top-0 !absolute'
                  img={womenImg}
                  aspectRatio={[1, 1.5]}
                  parentId='womenFashionImgLink'
                ></HoverImageBlockyEffect>
              </a>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
};

export default CheckoutMore;
