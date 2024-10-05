/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // Add paths to your components
  ],
  theme: {
    extend: {
      boxShadow: {
        'neon': '0 0 10px rgba(128, 0, 255, 0.7)',
      },
    },
  },
  plugins: [],
}

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
});