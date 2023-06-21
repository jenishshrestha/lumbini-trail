/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    container: {
      center: true,
      screens: {
        mobile: '600px',
        tablet: '900px',
        desktop: '1230px',
      },
      padding: {
        DEFAULT: '1rem',
      },
    },
    colors: {
      primary: '#E5BA49',
      default: '#152734',
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
    },
    fontFamily: {
      urbanist: ['Urbanist', 'sans-serif'],
    },
    // extend: {
    //   backgroundImage: {
    //     'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
    //     'gradient-conic':
    //       'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
    //   },
    // },
  },
  plugins: [],
};
