import React from 'react';
import './CheckoutMore.scss';
import menImg from '../../../app/assets/img/mahdi-bafande-XCU9ZV_ys5w-unsplash.png';
import womenImg from '../../../app/assets/img/alireza-dolati-OVS3rqXq9gg-unsplash.png';
import Image from 'next/image';

const CheckoutMore = () => {
  return (
    <section className='landing-check-more bg-checkout'>
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

      <article className='w-full p-12 md:p-24'>
        <div className='relative '>
          {/* bg-slate-600 */}

          <span
            className='bg-landing3  text-6xl font-oswald absolute -top-32  rotate-5 py-6 z-0  right-1/3
            sm:text-6xl  sm:-top-30  
            md:text-7xl md:p-8 md:py-9 md:-top-40       md:right-1/3
            lg:text-8xl lg:p-9 lg:py-10  lg:-top-40     lg:right-1/4
            xl:text-8xl xl:p-9 xl:pl-12  xl:-top-40     xl:right-1/4
           '
          >
            <div className='opacity-0 '>FILLLLLL</div>
          </span>

          <div
            className='absolute text-slate-50
            text-4xl font-oswald -top-20  z-0  right-1/3
            sm:text-4xl     sm:-top-30  
            md:text-6xl  md:py-9   md:-top-40  md:right-1/3
            lg:text-8xl  lg:py-10  lg:-top-40   lg:right-1/4
            xl:text-8xl  xl:pl-1  xl:-top-40  xl:right-1/4
            '
          >
            Check <span className='text-headeryellow'>Out</span> More
          </div>

          <div className='h-2 md:h-14 lg:h-24' />
        </div>

        <div className='md:flex  justify-center items-center '>
          <div className=' bg-menContainer p-10 lg:p-20 md:pr-0 lg:pr-0 flex flex-col justify-end font-oswald'>
            <div className='pb-10'>
              <h2 className='text-5xl  md:text-5xl lg:text-7xl text-slate-200'>
                Men Fashion&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </h2>
            </div>
            <div className=''>
              <Image
                className='max-h-700px  w-auto'
                src={menImg}
                alt='men'
              ></Image>
            </div>
          </div>

          <div className='bg-womenContainer p-10 lg:p-20 md:pl-0 lg:pl-0 font-oswald'>
            <div className='pb-10 pl-3'>
              <h2 className='text-5xl md:text-5xl lg:text-7xl'>
                Women Fashion
              </h2>
            </div>
            <div className=''>
              {' '}
              <Image
                className='max-h-700px w-auto'
                src={womenImg}
                alt='women'
              ></Image>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
};

export default CheckoutMore;
