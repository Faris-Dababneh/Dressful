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
        'tertiary': '#EEEEEE',
      },
    },
  },
  plugins: [],
}

