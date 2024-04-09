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
      },
    },
  },
  plugins: [],
};
export default config;
