/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        green: {
          50:  '#f0f7f2',
          100: '#d9ede0',
          200: '#b3dbc1',
          300: '#7fc09a',
          400: '#4ea272',
          500: '#2d7a51',
          600: '#1e5c3b',
          700: '#1a4d2e',
          800: '#163d25',
          900: '#1E4D2B',
          950: '#0e2616',
        },
        gold: {
          50:  '#fdf9ee',
          100: '#f9efcf',
          200: '#f2dc9b',
          300: '#eac360',
          400: '#e4ad36',
          500: '#C9922A',
          600: '#b07420',
          700: '#8e571c',
          800: '#75451d',
          900: '#62391b',
        },
        cream: '#F5F0E8',
        forest: '#1E4D2B',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
}
