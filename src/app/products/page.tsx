import { HoverImageEffect } from '@/components/HoverImageEffect/HoverImageEffect';
import img from '../assets/img/alireza-dolati-OVS3rqXq9gg-unsplash.png';
import Image from 'next/image';

export default function Products() {
  return (
    <section>
      <article className=' pt-36'>
        <div className='max-w-700px h-auto relative' id='hoverIMGdiv'>
          <Image src={img} alt='test' className='invisible' />
          <HoverImageEffect
            className='w-full h-full border  top-0 !absolute'
            img={img}
            aspectRatio={[1, 1.5]}
            parentId='hoverIMGdiv'
          ></HoverImageEffect>
        </div>
      </article>
    </section>
  );
}
