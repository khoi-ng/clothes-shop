'use client';
import { AdvancedImage, responsive } from '@cloudinary/react';
import { thumbnail } from '@cloudinary/url-gen/actions/resize';

import cloudinary from '@/db/cloudinary';
import './Header.scss';

const Header = () => {
  const myCld = cloudinary;

  const mainHeaderImg = myCld.image('Demo-Shop/mainHeaderDarkend');
  mainHeaderImg.resize(thumbnail().width(900)).format('auto');

  const headerImg2 = myCld.image('Demo-Shop/header2');
  headerImg2.resize(thumbnail().width(900)).format('auto');

  const headerImg3 = myCld.image('Demo-Shop/header3');
  headerImg3.resize(thumbnail().width(900)).format('auto');

  return (
    <header className='landing-header w-full h-screen '>
      <section className='w-full h-full bg-black'>
        <div className='flex items-end'>
          <AdvancedImage
            className='h-2/5 w-auto absolute right-1/4 bottom-0'
            cldImg={headerImg2}
            plugins={[responsive()]}
          />
          <AdvancedImage
            className='h-3/5 w-auto absolute right-2/4 bottom-0'
            cldImg={headerImg3}
            plugins={[responsive()]}
          />
          <AdvancedImage
            className='h-screen w-auto absolute right-0 top-0'
            cldImg={mainHeaderImg}
            plugins={[responsive()]}
          />
          <div className='header-title absolute -rotate-[95deg] -left-20 bottom-1/3 text-white z-10 font-oswald font-normal'>
            <h1>
              L
              <span className='text-headeryellow font-oswald font-normal'>
                OO
              </span>
              K BETTER AND
            </h1>
            <h1>LIVE BETTER</h1>
          </div>
        </div>
      </section>
    </header>
  );
};

export default Header;
