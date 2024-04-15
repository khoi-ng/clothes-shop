import React from 'react';
import { FaGithub } from 'react-icons/fa';
const Footer = () => {
  return (
    <footer className='h-20 bg-[#CBCBC5] flex items-center justify-between px-10 md:px-20'>
      <a
        className='font-oswald text-[16px] md:text-[24px] hover:text-[#68689b]'
        href='https://github.com/khoi-ng'
      >
        Designed and programmed by Duy Khoi Nguyen
      </a>
      <a
        href='https://github.com/khoi-ng '
        className='text-3xl hover:text-[#68689b]'
      >
        <FaGithub />
      </a>
    </footer>
  );
};

export default Footer;
