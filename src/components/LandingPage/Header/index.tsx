'use client';
import { AdvancedImage, responsive } from '@cloudinary/react';
import { thumbnail } from '@cloudinary/url-gen/actions/resize';
import cloudinary from '@/db/cloudinary';
import './Header.scss';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { HoverImageWavyEffect } from '@/components/HoverImageEffects/HoverImageWavyEffect';
import Image, { StaticImageData } from 'next/image';
gsap.registerPlugin(ScrollTrigger);

const Header = () => {
  const myCld = cloudinary;

  const mainHeaderImg = myCld.image('Demo-Shop/mainHeaderDarkend');
  mainHeaderImg.resize(thumbnail().width(900)).format('auto');

  const headerImg2 = myCld.image('Demo-Shop/header2');
  headerImg2.resize(thumbnail().width(900)).format('auto');

  const headerImg3 = myCld.image('Demo-Shop/header3');
  headerImg3.resize(thumbnail().width(900)).format('auto');

  useGSAP(() => {
    gsap.set('.header-title-rotated span', {
      opacity: 0,
      y: 32,
    });
    gsap.set(['.headerIMG'], {
      y: gsap.utils.random(100, 50),
      opacity: 0,
    });

    const timelineFirstLoad = gsap.timeline();
    timelineFirstLoad
      .to('.header-title-rotated span', {
        y: 0,
        opacity: 1,
        ease: 'expo.out',
        duration: 2,
        stagger: 0.01,
      })
      .to(
        ['.mainHeaderImg', '#headerImg3'],
        {
          opacity: 1,
          y: 0,
          ease: 'power3.out',
          duration: 2,
          stagger: 0.04,
        },
        0.5
      )
      .to(
        '#headerImg2',
        {
          opacity: 1,
          y: 0,
          ease: 'ease',
          duration: 1.2,
        },
        1.3
      );

    const timelineScroll = gsap.timeline({
      defaults: {
        immediateRender: false,
      },
      scrollTrigger: {
        trigger: '#main-header',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        // markers: true,
      },
    });

    timelineScroll
      .to(
        '.mainHeaderImg',
        {
          ease: 'none',
          yPercent: 40,
        },
        0
      )
      .to(
        '#headerImg3',
        {
          ease: 'none',
          yPercent: 40,
        },
        0
      )
      .to(
        '#headerImg2',
        {
          ease: 'none',
          yPercent: gsap.utils.random(-80, -60),
        },
        0
      );

    // const headerImage = [
    //   ...document.querySelectorAll('.headerIMG:not(#mainHeaderImg)'),
    // ];
    // headerImage.forEach((img) => {
    //   timelineScroll.to(
    //     img,
    //     {
    //       ease: 'none',
    //       yPercent: gsap.utils.random(-50, -20),
    //     },
    //     0
    //   );
    // });
  });

  return (
    <header
      id='main-header'
      className='landing-header w-full h-screen relative -z-2'
    >
      <section className='w-full h-full bg-black'>
        <div className='flex items-end'>
          <AdvancedImage
            id='headerImg2'
            className='headerIMG h-2/5 w-auto absolute right-1/4 bottom-0 opacity-0 '
            cldImg={headerImg2}
            plugins={[responsive()]}
          />

          <AdvancedImage
            id='headerImg3'
            className='headerIMG h-3/5 w-auto absolute right-2/4 bottom-0  opacity-0 '
            cldImg={headerImg3}
            plugins={[responsive()]}
          />

          <div className='h-screen w-auto  right-0 top-0 absolute'>
            <div className='mainHeaderImg-wrapper h-screen w-auto  right-0 top-0 relative'>
              <AdvancedImage
                id='mainHeaderImg'
                className='mainHeaderImg headerIMG h-screen w-auto  right-0 top-0 opacity-0 '
                cldImg={mainHeaderImg}
                plugins={[responsive()]}
              />
              {/* <HoverImageWavyEffect
                className='mainHeaderImg w-full h-full top-0 !absolute hover:saturate-0'
                imgID={'mainHeaderImg'}
                parentId='mainHeaderImg-wrapper'
                aspectRatio={[1, 1.50016818029]}
              /> */}
            </div>
          </div>

          <div className='header-title absolute -rotate-[95deg] -left-20 bottom-1/3 text-white z-10 font-oswald font-normal'>
            <h1 className='header-title-rotated'>
              <span className='opacity-0'>L</span>
              <span className='text-headeryellow font-oswald font-normal opacity-0'>
                OO
              </span>
              <span className='opacity-0'>K</span>
              <span className='opacity-0'> </span>
              <span className='opacity-0'>B</span>
              <span className='opacity-0'>E</span>
              <span className='opacity-0'>T</span>
              <span className='opacity-0'>T</span>
              <span className='opacity-0'>E</span>
              <span className='opacity-0'>R</span>
              <span className='opacity-0'> </span>
              <span className='opacity-0'>A</span>
              <span className='opacity-0'>N</span>
              <span className='opacity-0'>D</span>
            </h1>
            <h1 className='header-title-rotated'>
              <span className='opacity-0'>L</span>
              <span className='opacity-0'>I</span>
              <span className='opacity-0'>V</span>
              <span className='opacity-0'>E</span>
              <span className='opacity-0'> </span>
              <span className='opacity-0'>B</span>
              <span className='opacity-0'>E</span>
              <span className='opacity-0'>T</span>
              <span className='opacity-0'>T</span>
              <span className='opacity-0'>E</span>
              <span className='opacity-0'>R</span>
            </h1>
          </div>
        </div>
      </section>
    </header>
  );
};

export default Header;
