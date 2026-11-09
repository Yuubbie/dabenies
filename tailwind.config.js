/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#070b14',
          900: '#0b1220',
          850: '#0f1728',
          800: '#141c2e',
          700: '#1c2740',
          600: '#263352',
          500: '#3a4a6b',
        },
        gold: {
          50: '#fbf7ec',
          100: '#f4e8c8',
          200: '#e8d19a',
          300: '#d4b36a',
          400: '#c9a227',
          500: '#b8922a',
          600: '#9a7520',
          700: '#7a5c18',
        },
        ivory: '#f4efe4',
        cream: '#e6dcc8',
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        sans: ['Outfit', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        gold: '0 0 0 1px rgba(201,162,39,0.28), 0 18px 50px rgba(0,0,0,0.35)',
        glow: '0 0 40px rgba(201,162,39,0.12)',
      },
      backgroundImage: {
        'luxe': 'radial-gradient(1200px 600px at 10% -10%, rgba(201,162,39,0.10), transparent 50%), radial-gradient(900px 500px at 100% 0%, rgba(58,74,107,0.25), transparent 45%)',
      },
      keyframes: {
        fadeup: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(201,162,39,0.35)' },
          '50%': { boxShadow: '0 0 0 8px rgba(201,162,39,0)' },
        },
      },
      animation: {
        fadeup: 'fadeup 0.45s ease-out both',
        pulseGold: 'pulseGold 2.4s ease-out infinite',
      },
    },
  },
  plugins: [],
}
