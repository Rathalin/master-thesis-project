const { createGlobPatternsForDependencies } = require('@nrwl/angular/tailwind')
const { join } = require('path')
const tailwindColors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
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
