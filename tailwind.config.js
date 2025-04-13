/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'happy': '#FFD700',
        'sad': '#4169E1',
        'angry': '#FF4500',
        'chill': '#90EE90',
        'energetic': '#FF69B4',
        'peaceful': '#87CEEB',
      },
    },
  },
  plugins: [],
} 