// ParallaxSlider 🐸

'use client';

import './ParallaxSlider.scss';
import React, { useEffect, useRef, useState } from 'react';
import { ICategory, Gender } from '@/interfaces';
import cloudinary from '@/db/cloudinary';
import { Resize, thumbnail } from '@cloudinary/url-gen/actions/resize';
import { AdvancedImage, lazyload, responsive } from '@cloudinary/react';

const ParallaxSlider = ({
  height = 'h-[300px]',
  width = 'w-[240px]',
  imgHeight = 'h-[400px]',
  imgWidth = 'w-[400px]',
  genderObjectString,
  currentCategoryID,
}: {
  height?: string;
  width?: string;
  imgHeight?: string;
  imgWidth?: string;
  genderObjectString: string;
  currentCategoryID: string;
}) => {
  const initialMouseXData = useRef<number>(0);
  const [percentageState, setPercentageState] = useState<number>(0);
  const currentPercentage = useRef<number>(0);
  const genderObject: Gender | null = JSON.parse(genderObjectString);
  const parraxSliderID = 'parallaxSlider' + currentCategoryID;
  const boundingRect = useRef<DOMRect | undefined>();
  const mouseSpeed = 0.02;

  // const length = genderObject?.categories?.length;

  const wholeWidthRef = useRef<number>(0);
  // 240 * (length ? length - 1 : 0) - 10 + 10 * (length ? length - 1 : 0);

  useEffect(() => {
    boundingRect.current = document
      .getElementById(parraxSliderID)
      ?.getBoundingClientRect();

    const rectWhole = document
      .getElementsByClassName('image-track')[0]
      ?.getBoundingClientRect();
    if (rectWhole) wholeWidthRef.current = rectWhole.width;
  });

  function handleMouseDown(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    const rect = boundingRect.current;
    if (rect) {
      const x = e.clientX - rect.left;

      initialMouseXData.current = x;
    }
  }

  function handleMouseUp(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    // console.log(e.clientX);
    initialMouseXData.current = 0;
  }

  function handleMouseMove(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    if (initialMouseXData.current === 0) return;

    const rect = boundingRect.current;
    if (rect) {
      const x = e.clientX - rect.left; // x position within the element.
      const containerWidth = rect.width; //containerWidth is 100% width

      // this start from 0 and as the mouse moves it gets negative or positive
      const mouseDelta = (x - initialMouseXData.current) * mouseSpeed;
      const maxDelta = containerWidth / 2;
      // console.log('container', containerWidth);
      // console.log('wholeWidth', wholeWidthRef.current);

      // mouseDelta converted in percentage to relative size of container, container is 100%
      const percentage = (mouseDelta / maxDelta) * 100;
      const nextPercentage = Math.max(
        Math.min(currentPercentage.current + percentage, 0),
        // -100
        -100 + (containerWidth / wholeWidthRef.current) * 100
      );

      currentPercentage.current = nextPercentage;

      for (const image of document.getElementsByClassName(
        'parallaxIMG-categorie'
      )) {
        image.animate(
          {
            objectPosition: `${
              100 + nextPercentage + (mouseDelta * 20) / containerWidth
            }% center`,
          },
          { duration: 50, fill: 'forwards' }
        );
      }

      setPercentageState(currentPercentage.current);
    }
  }

  return (
    <article
      className={`parallax-slider m-3 ${height} `}
      id={parraxSliderID}
      onMouseDown={(e) => handleMouseDown(e)}
      onMouseMove={(e) => {
        handleMouseMove(e);
      }}
      onMouseUp={(e) => {
        handleMouseUp(e);
      }}
      onMouseLeave={(e) => {
        handleMouseUp(e);
      }}
    >
      <div
        className='image-track'
        // id='image-track'
        style={{
          transform: `translateX(${percentageState}%)`,
        }}
      >
        {genderObject?.categories?.map(
          (category, index) =>
            category.id !== currentCategoryID && (
              <ParallaxItem
                key={`${category.id}-paralax-item-${index}-ITEM`}
                category={category}
                width={width}
                height={height}
                imgHeight={imgHeight}
                imgWidth={imgWidth}
              />
            )
        )}
      </div>
    </article>
  );
};

const ParallaxItem = ({
  width,
  height,
  imgHeight,
  imgWidth,
  category,
}: {
  width: string;
  height: string;
  imgHeight: string;
  imgWidth: string;
  category: ICategory;
}) => {
  const myCld = cloudinary;
  const bentoImg = myCld.image(category.bentoUrls[1]);
  bentoImg.resize(Resize.crop(700)).format('auto');
  // bentoImg.resize(thumbnail().width(600)).format('auto');

  return (
    <a className={`item ${width} ${height}`} key={`${category.id}-sliderimg`}>
      <AdvancedImage
        className={`image parallaxIMG-categorie ${imgHeight} ${imgWidth} hover:scale-105 transition-all`}
        cldImg={bentoImg}
        plugins={[responsive(), lazyload()]}
      />

      <div className='absolute flext text-center text-3xl bottom-10  text-white w-[200px]'>
        {category.name}
      </div>
    </a>
  );
};

export default ParallaxSlider;
