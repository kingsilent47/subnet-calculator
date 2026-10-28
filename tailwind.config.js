/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        'sm': '0.125rem', // Strict sharp corners
        'md': '0.25rem',
      }
    },
  },
  plugins: [],
}
