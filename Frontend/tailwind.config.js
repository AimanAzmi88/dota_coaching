/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'bold': '10px 10px 0px 0px rgba(0, 0, 0, 1)',
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(180deg, rgba(255,219,88,1) 0%, rgba(253,253,150,1) 100%)',
      },
      colors: {
        'button': '#a388ee',
        'buttonh': '#815aed',
        'default': '#90ee90',
        'form': '#7fbc8c',
        'box-color': '#69e2d7',
        'slot': '#ffa07a',
      },
      height: {
        'background': '500px'
      },
      spacing: {
        '96rem': '96rem', 
        '96em': '96em',   
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: 0, transform: 'translateY(10px) scale(0.95)' },
          '100%': { opacity: 1, transform: 'translateY(0) scale(1)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.3s ease-out',
      },
    },
  },
  plugins: [],
}