/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontSize: {
        xxs: ['0.65rem', '1rem'],
        '2xs': ['0.52vw', '0.9vh'],
        '3xs': ['0.50vw', '0.9vh'],
      },
      screens: {
        laptop: '1024px',
        desktop: '1281px',
        xxl: '1900px',
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Ubuntu',
          'sans-serif',
        ],
      },
    },
  },
}
