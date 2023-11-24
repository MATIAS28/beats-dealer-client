/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
    'gfold' :'400px' ,
    ...defaultTheme.screens
  },
    extend: {},
  },
  plugins: [],
}

