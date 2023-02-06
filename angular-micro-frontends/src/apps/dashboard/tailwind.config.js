const tailwindColors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: tailwindColors.stone,
        secondary: tailwindColors.gray,
        accent: tailwindColors.amber,
      },
    },
  },
  plugins: [],
}
