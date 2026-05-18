/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        ink: '#1a1a1a',
        muted: '#6b6b6b',
        border: '#e5e5e5',
      },
    },
  },
  plugins: [],
}
