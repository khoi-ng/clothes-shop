'use client';

import './SimpleSwiperProductCarousel.scss';
import cloudinary from '@/db/cloudinary';
import { Products } from '@/interfaces';
import { AdvancedImage, responsive } from '@cloudinary/react';
import React from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import { pad } from '@cloudinary/url-gen/actions/resize';
import Link from 'next/link';

const SimpleSwiperProductCarousel = ({
  products,
}: {
  products: Products[];
}) => {
  const itemLength = products.length;
  function slidesPerViewLength(slideNumber: number) {
    return itemLength >= slideNumber ? slideNumber : itemLength;
  }

  return (
    <Swiper
      className='simpleSwiperSlider max-w-[100vw]'
      grabCursor={true}
      //   centeredSlides={true}

      spaceBetween={20}
      slidesPerView={1}
      // onSlideChange={() => console.log('slide change')}
      // onSwiper={(swiper) => console.log(swiper)}
      modules={[Navigation]}
      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }}
      breakpoints={{
        450: {
          slidesPerView: 1,
        },
        800: {
          slidesPerView: slidesPerViewLength(2),
        },
        1000: {
          slidesPerView: slidesPerViewLength(3),
        },
        1300: {
          slidesPerView: slidesPerViewLength(4),
        },

        1500: {
          slidesPerView: slidesPerViewLength(5),
        },
        1700: {
          slidesPerView: slidesPerViewLength(6),
        },
        2000: {
          slidesPerView: slidesPerViewLength(7),
        },
      }}
    >
      {products.map((product) => {
        const myCld = cloudinary;
        const otherProductIMG = myCld.image(product.imageUrl).format('auto');
        otherProductIMG.resize(pad(500, 500));
        return (
          <SwiperSlide
            key={`${product.id}-product-key-slide`}
            className=' bg-white w-[250px] rounded-lg        items-center justify-center font-roboto   shadow-sm   hover:shadow-xl hover:shadow-gray-100 transition-all gap-2'
          >
            <a
              href={`/products/${product.genderName}/${product.categoryUriName}/${product.id}`}
              key={`${product.id}-product-key`}
              className='bg-white w-[250px] rounded-lg        items-center justify-center font-roboto   shadow-sm   hover:shadow-xl hover:shadow-gray-100 transition-all gap-2'
            >
              <article className='flex-col  rounded-lg    '>
                <div className='flex  p-10 pb-3 m-auto h-[250px]'>
                  <AdvancedImage
                    className='object-contain h-full hover:scale-105 transition-all m-auto'
                    cldImg={otherProductIMG}
                    plugins={[responsive()]}
                    alt='adf_image'
                  />
                </div>

                <div className='flex flex-col p-6  mt-auto rounded-lg    '>
                  <h3 className='font-semibold truncate'>{product.name}</h3>
                  <p className='text-gray-600 text-sm truncate'>
                    {product.description
                      ? product.description
                      : 'No Description yet'}
                  </p>
                  <div className='text-right mt-4'>
                    <span className='font-semibold'>{product.price}€</span>
                  </div>
                </div>
              </article>
            </a>
          </SwiperSlide>
        );
      })}

      <div className='slider-controler'>
        <div className='swiper-button-prev '>
          <MdKeyboardArrowLeft />
        </div>
        <div className='swiper-button-next  text-5xl'>
          <MdKeyboardArrowRight />
        </div>
      </div>
    </Swiper>
  );
};

export default SimpleSwiperProductCarousel;
