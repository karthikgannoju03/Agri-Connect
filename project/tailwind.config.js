/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#ecfdf4',
          100: '#d1f9e2',
          200: '#a6f0c9',
          300: '#6ee1ac',
          400: '#39c989',
          500: '#1aad6f',
          600: '#128a59',
          700: '#11704b',
          800: '#115a3d',
          900: '#0f4a34',
          950: '#052e1f',
        },
        secondary: {
          50: '#fef4ee',
          100: '#fde6d5',
          200: '#fac7ab',
          300: '#f7a377',
          400: '#f47643',
          500: '#f15421',
          600: '#e23914',
          700: '#bc2913',
          800: '#952217',
          900: '#7a2016',
          950: '#420c07',
        },
        accent: {
          50: '#fcf9eb',
          100: '#f9f2d2',
          200: '#f3e4a4',
          300: '#ecd06c',
          400: '#e4b93d',
          500: '#dda321',
          600: '#cb8319',
          700: '#a85f17',
          800: '#894c1a',
          900: '#723f19',
          950: '#412109',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
    },
  },
  plugins: [],
};