'use client';

import cloudinary from '@/db/cloudinary';

import '../SimpleSwiperProductCarousel/SimpleSwiperProductCarousel.scss';
import {
  AdvancedImage,
  lazyload,
  placeholder,
  responsive,
} from '@cloudinary/react';
import React from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import { pad } from '@cloudinary/url-gen/actions/resize';
import { Category } from '@prisma/client';

const SimpleSwiperCategoriesCarousel = ({
  categories,
}: {
  categories: Category[];
}) => {
  console.log(categories);

  const itemLength = categories.length;
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
        350: {
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
          slidesPerView: slidesPerViewLength(7),
        },
        2000: {
          slidesPerView: slidesPerViewLength(8),
        },
      }}
    >
      {categories.map((category) => {
        const myCld = cloudinary;
        const bentoIMG = myCld.image(category.bentoUrls[0]).format('auto');
        // bentoIMG.resize(pad(700, 700));
        return (
          <SwiperSlide
            key={`${category.id}-product-key-slide`}
            className=' bg-white w-[220px] max-h-[280px] rounded-lg items-center justify-center font-roboto shadow-sm   hover:shadow-xl hover:shadow-gray-100 transition-all gap-2 overflow-hidden'
          >
            <a href={`/products/${category.genderName}/${category.uriName}`}>
              <AdvancedImage
                className={`min-h-[280px] image parallaxIMG-categorie hover:scale-105 transition-all object-cover brightness-[88%] hover:brightness-[100%]`}
                cldImg={bentoIMG}
                plugins={[responsive(), lazyload(), placeholder()]}
              />

              <span className='absolute text-3xl bottom-5 left-0 right-0 m-auto text-white w-auto text-center'>
                {category.name}
              </span>
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

export default SimpleSwiperCategoriesCarousel;
