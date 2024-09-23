/** @type {import('tailwindcss').Config} */
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

