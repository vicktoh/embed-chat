/** @type {import('tailwindcss').Config} */
export default {
  important: true,
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      width: {
        mobile: "calc(100vw - 40px)"
      }
    },
  },
  plugins: [],
}

