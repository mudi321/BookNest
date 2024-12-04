/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#3E362E',
        'secondary': '#865D36',
        'tertiary':'#A69080',
        'blackBG': '#AC8968',
        'Favourite': '#93785B',
        'offWhite': '#F9F9F3',
        'matteBlack':'#28282B',
        'gold':'#e4c590',
        
      },
      fontFamily: {
        'primary': ["Crimson Text", "serif"],
        'secondary': ["Poppins", "sans-serif"]
      }
      
    },
  },
  plugins: [],
}
