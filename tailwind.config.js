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
        '2xs': ['0.47rem', '0.50rem'],
        '3xs': ['0.40rem', '0.45rem'],
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
