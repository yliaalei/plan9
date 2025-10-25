/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        yoga: {
          50: '#f7fffb',
          100: '#ecfff5',
          200: '#c9f6e7',
          500: '#2aa679'
        }
      }
    }
  },
  plugins: [],
}
