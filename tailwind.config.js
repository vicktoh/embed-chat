/** @type {import('tailwindcss').Config} */
export default {
  important: true,
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  prefix: 'dmd-',
  theme: {
    extend: {
      width: {
        mobile: "calc(100vw - 40px)"
      }, 
      animation: {
        'pulse-fast': 'pulse 0.5s 100ms cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-medium': 'pulse 0.5s 200ms cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}

