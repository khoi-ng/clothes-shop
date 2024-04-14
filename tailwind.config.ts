import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        menuShadow: '-2px 0px 12px hsla(255,255,255,255.2)',
      },
      transition: {
        rightnav: 'right 0.4s',
      },
      animation: {
        fadein: 'fadein .5s ease-in-out',
      },
      keyframes: {
        fadein: {
          '0%': {
            opacity: '0',
            transform: 'translateY(1rem)',
          },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },

      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      rotate: {
        '95': '95deg',
        '-95': '-95deg',
      },
      fontFamily: {
        oswald: ['Oswald', 'sans-serif'],
        rocknroll: ['RocknRoll One', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
      textColor: {
        headeryellow: '#ECA914',
      },
      backgroundColor: {
        landing3: '#A09999',
        menContainer: '#19171A',
        womenContainer: '#F4EBD5',
        checkout: '#222023',
      },
      scale: {
        '175': '1.75',
        '200': '2',
      },
    },
  },
  plugins: [],
};
export default config;
