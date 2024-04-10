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
        menContainer: '#19171A',
        womenContainer: '#F4EBD5',
        checkout: '#222023',
      },
      height: {
        '300px': '300px',
        '400px': '400px',
        '500px': '500px',
        '600px': '600px',
        '700px': '700px',
        '800px': '800px',
        '900px': '900px',
        '1000px': '1000px',
      },
      maxHeight: {
        '300px': '300px',
        '400px': '400px',
        '500px': '500px',
        '600px': '600px',
        '700px': '700px',
        '800px': '800px',
        '900px': '900px',
        '1000px': '1000px',
      },
      maxWidth: {
        '300px': '300px',
        '400px': '400px',
        '500px': '500px',
        '600px': '600px',
        '700px': '700px',
        '800px': '800px',
        '900px': '900px',
        '1000px': '1000px',
      },
    },
  },
  plugins: [],
};
export default config;
