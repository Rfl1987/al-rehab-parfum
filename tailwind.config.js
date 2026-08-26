/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: { 50: '#FDFCF9', 100: '#F9F6F0', 200: '#F1EBE0', 300: '#E6DCCB' },
        espresso: { 900: '#201B16', 800: '#2C2621', 700: '#3D352E', 500: '#6B5F53', 400: '#8A7D6F' },
        gold: { 300: '#E3C989', 400: '#D4B26A', 500: '#C5A059', 600: '#A98543', 700: '#8A6B34' },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 10px 30px rgba(139, 115, 85, 0.10)',
        'card-hover': '0 18px 45px rgba(139, 115, 85, 0.18)',
      },
    },
  },
  plugins: [],
}