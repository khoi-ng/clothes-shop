import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import './SwiperSlideCarousel.scss';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { FeaturedProduct } from '@/interfaces';
import cloudinary from '@/db/cloudinary';
import { AdvancedImage, responsive } from '@cloudinary/react';
import {
  // fit, fill,
  pad,
} from '@cloudinary/url-gen/actions/resize';

const SwiperSlideCarousel = ({ items }: { items: string }) => {
  const myCld = cloudinary;

  const itemsObj: FeaturedProduct[] | undefined = JSON.parse(items);

  const [swiperSlides, setSwiperSlides] = useState<
    React.JSX.Element[] | undefined
  >();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const swiperSliders = itemsObj?.map((item, i) => {
      const newItemImg = myCld.image(item.imageUrl).format('auto');
      newItemImg.resize(pad(500, 666));

      // newItemImg.resize(fit(400, 400));
      // newItemImg.resize(pad(800, 900));
      // thumbnail().height(300)).format('auto');

      const price = JSON.parse(JSON.stringify(item.price));

      return (
        <SwiperSlide key={`carousel-${i}`}>
          <AdvancedImage
            cldImg={newItemImg}
            plugins={[responsive()]}
            alt='slide_image'
          />
          <div className='short_description py-3.5 flex items-center justify-center relative '>
            <h2 className='text-3xl overflow-ellipsis leading-10'>
              {item.name}
            </h2>
            <h3 className='text-3xl'>{`${price} €`}</h3>
          </div>
        </SwiperSlide>
      );
    });

    setSwiperSlides(swiperSliders);
    setIsLoading(false);
  }, []);

  return (
    <div className='w-9/12'>
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
        {!isLoading && swiperSlides?.map((slide) => slide)}

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
