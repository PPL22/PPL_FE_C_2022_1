/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'acintya-prasada': "url('/src/assets/images/gedung_ap.png')",
        background: "url('/src/assets/images/background.png')",
      },
      scale: {
        300: '3',
      },
    },
  },
  plugins: [],
};
