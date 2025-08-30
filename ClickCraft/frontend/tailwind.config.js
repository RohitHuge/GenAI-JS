/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        neon: {
          orange: '#ff6b35',
          'orange-light': '#ff8a5c',
          'orange-dark': '#e55a2b',
        },
        dark: {
          bg: '#0a0a0a',
          'bg-secondary': '#1a1a1a',
          'bg-card': '#2a2a2a',
          border: '#404040',
          text: '#ffffff',
          'text-secondary': '#cccccc',
        }
      },
    },
  },
  plugins: [],
}

