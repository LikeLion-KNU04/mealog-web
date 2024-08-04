/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#A4C4B5',
          50: '#FBFCFB',
          100: '#EEF4F1',
          200: '#D6E4DD',
          300: '#BDD4C9',
          400: '#A4C4B5',
          500: '#82AE99',
          600: '#61967E',
          700: '#4B7461',
          800: '#355245',
          900: '#1F3028',
          950: '#141F1A',
        },
      },
    },
  },
  plugins: [],
}
