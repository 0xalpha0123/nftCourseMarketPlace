/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      flex : {
        "2" : "2 2 0%"
      },
      opacity:["disabled"],
      cursor: ["disabled"],
      maxWidth : {
        "8xl": "1920px"
      }
    },
  },
  plugins: [],
}
