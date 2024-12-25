/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6A0DAD', 
        'primary-light':"rgba(106, 13, 173, 0.1)", 
        secondary: '#FFA500',  
      },
    },
  },
  plugins: [],
}