/** @type {import('tailwindcss').Config} */
export default {
  prefix: 'dumble-',
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

