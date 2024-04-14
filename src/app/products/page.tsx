import { HoverImageBlockyEffect } from '@/components/HoverImageEffects/HoverImageBlockyEffect';
import img from '../assets/img/alireza-dolati-OVS3rqXq9gg-unsplash.png';
import Image from 'next/image';
import ParallaxSlider from '@/components/ParallaxSlider/ParallaxSlider';

export default function Products() {
  return (
    <section>
      <article className=' pt-36'>
        {/* <ParallaxSlider /> */}

        {/* <div className='max-h-[700px] h-auto relative' id='hoverIMGdiv'>
          <Image src={img} alt='test' className='invisible' />
          <HoverImageBlockyEffect
            className='w-full h-full border  top-0 !absolute'
            img={img}
            aspectRatio={[1, 1.5]}
            parentId='hoverIMGdiv'
          ></HoverImageBlockyEffect>
        </div> */}
      </article>
    </section>
  );
}
