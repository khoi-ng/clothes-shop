import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import {
  Navigation,
  Pagination,
  EffectCoverflow,
  Autoplay,
} from 'swiper/modules';
import './SwiperSlideCarousel.scss';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

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
        <SwiperSlide key={`carousel-${i}`} id={`carousel-slider-${i}`}>
          <AdvancedImage
            className='hover:scale-105 pt-5'
            cldImg={newItemImg}
            plugins={[responsive()]}
            alt='slide_image'
          />
          <div className='short_description py-3.5 flex items-center justify-center relative font-oswald'>
            <h2 className='text-3xl overflow-ellipsis leading-10'>
              {item.name}
            </h2>
            <h3 className='text-3xl'>{`${price} €`}</h3>
            <div className='opacity-0 hidden '>description</div>
          </div>
        </SwiperSlide>
      );
    });

    setSwiperSlides(swiperSliders);
    setIsLoading(false);
  }, []);

  const currentActiveIndex = useRef(-1);
  const [activeInfo, setActiveInfo] = useState<{
    title: string;
    description: string | null;
  }>({ title: '', description: '' });

  function showCurrentSwiperInfo(swiper: SwiperClass) {
    if (itemsObj && currentActiveIndex.current !== swiper.realIndex) {
      const currentItem = itemsObj[swiper.realIndex];
      const content = {
        title: currentItem.name,
        description: currentItem.description,
      };
      currentActiveIndex.current = swiper.realIndex;
      setActiveInfo(content);
      // console.log(currentActiveIndex.current);
    }
  }

  return (
    <div className='w-10/12'>
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
        speed={120}
        autoplay={{
          delay: 7000,
          disableOnInteraction: true,
          reverseDirection: false,
        }}
        onActiveIndexChange={(swiper) => {
          showCurrentSwiperInfo(swiper);
        }}
        pagination={{ el: '.swiper-pagination', clickable: true }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        modules={[Autoplay, EffectCoverflow, Pagination, Navigation]}
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
          <div className='swiper-button-prev slider-arrow hover:scale-110'>
            <MdKeyboardArrowLeft />
          </div>
          <div className='swiper-button-next slider-arrow hover:scale-110'>
            <MdKeyboardArrowRight />
          </div>
          {/* <div className='swiper-pagination'></div> */}
        </div>
      </Swiper>

      <article className='flex w-full items-end justify-end top-2 -right-10 2xl:absolute 2xl:top-16 2xl:right-14 '>
        <div className=' flex flex-col text-white h-40 border rounded-md p-2 my-3 font-oswald w-full 2xl:absolute 2xl:w-1/3 2xl:max-h-40 relative overflow-hidden'>
          <div className='max-h-28 h-28 pb-1 overflow-hidden'>
            <h3 className='text-3xl'>{activeInfo.title}</h3>
            <div>
              {activeInfo.description
                ? activeInfo.description
                : '- No Description yet -'}
            </div>
          </div>

          <button className='self-end justify-self-end hover:bg-sky-700'>
            See more
          </button>
        </div>
      </article>
    </div>
  );
};

export default SwiperSlideCarousel;
