/** @type {import('tailwindcss').Config} */
module.exports = {
  
  content: ["./src/**/*.{html,js}"],
  important: '#root',
  theme: {
    extend: {
      colors: {
        'primary': '#222831',
        'darkened': '#1f252d',
        'accent': '#393E46',
        'secondary': '#00ADB5',
        'secondary-darkened': '#008a91',
        'tertiary': '#EEEEEE',
      },
    },
  },
  plugins: [
    require('tailwindcss-animated'),
    require("daisyui")
  ],
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
}

