/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens : {
      "xs" : "475px",
      ...defaultTheme.screens
    },
    extend: {
      flex : {
        "2" : "2 2 0%",
        "3" : "3 3 0%",
        "4" : "4 4 0%"
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
