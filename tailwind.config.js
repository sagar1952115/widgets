/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        cyan:"linear-gradient(239.26deg,#DDEEED 63.17%,#FDF1E0 94.92%)"
      }
    },
  },
  plugins: [],
}