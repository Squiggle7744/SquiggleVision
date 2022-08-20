/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      aspectRatio: {}
    },
    screens: {
      'mobile': '640px',
      // => @media (min-width: 640px) { ... }

      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }

      'desktop': '1920px',
      // => @media (min-width: 1280px) { ... }
    },
    fontFamily: {
      'darkGrot': ['"Darker Grotesque"', 'sans-serif'],
      'darkGrotBlack': ['"Darker Grotesque"', 'sans-serif']
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require("daisyui")
  ],
}
