import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectCoverflow,
} from 'swiper/modules';
import './SwiperSlideCarousel.scss';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import img from '../../assets/img/header/7024d0ee594897127b214835bf254151.png';
import Image from 'next/image';

const SwiperSlideCarousel = () => {
  return (
    <div className='container'>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={3.52}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={{ el: '.swiper-pagination', clickable: true }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className='swiper_container'
        breakpoints={{
          // when window width is >= 640px
          0: {
            slidesPerView: 1,
            centeredSlides: true,
          },
          700: {
            slidesPerView: 2,
            centeredSlides: true,
          },
          1300: {
            slidesPerView: 3.52,
            centeredSlides: true,
          },
        }}
      >
        <SwiperSlide>
          <Image src={img} alt='slide_image' />
          <div className='short_description'>
            <h2>Title</h2>
            <h3>price</h3>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <Image src={img} alt='slide_image' />
          <div className='short_description'>
            <h2>Title</h2>
            <h3>price</h3>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <Image src={img} alt='slide_image' />
          <div className='short_description'>
            <h2>Title</h2>
            <h3>price</h3>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <Image src={img} alt='slide_image' />
          <div className='short_description'>
            <h2>Title</h2>
            <h3>price</h3>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <Image src={img} alt='slide_image' />
          <div className='short_description'>
            <h2>Title</h2>
            <h3>price</h3>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <Image src={img} alt='slide_image' />
          <div className='short_description'>
            <h2>Title</h2>
            <h3>price</h3>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <Image src={img} alt='slide_image' />
          <div className='short_description'>
            <h2>Title</h2>
            <h3>price</h3>
          </div>
        </SwiperSlide>

        <div className='slider-controler'>
          <div className='swiper-button-prev slider-arrow'></div>
          <div className='swiper-button-next slider-arrow'></div>
          {/* <div className='swiper-pagination'></div> */}
        </div>
      </Swiper>
    </div>
  );
};

export default SwiperSlideCarousel;
