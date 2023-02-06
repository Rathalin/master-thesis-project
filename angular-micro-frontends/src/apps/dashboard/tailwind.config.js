const tailwindColors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: tailwindColors.purple,
        secondary: tailwindColors.gray,
        accent: tailwindColors.blue,
      },
    },
  },
  plugins: [],
}
