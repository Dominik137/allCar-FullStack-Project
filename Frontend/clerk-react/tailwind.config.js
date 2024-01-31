/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    // Add more paths if needed
  ],
  theme: {
    extend: {
      fontFamily: {
        'sixty4': ['Sixtyfour', 'sans-serif'],
      },
    },
  },
  plugins: [
    // Add any plugins you want to use
  ],
}

