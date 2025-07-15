import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Adicione esta linha para a App Router
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#000000',
        'secondary': '#ffffff',
        'accent': '#dc2626',
        'text-primary': '#000000',
        'text-secondary': '#666666',
        'text-light': '#999999',
        'bg-primary': '#ffffff',
        'bg-secondary': '#f8f9fa',
        'bg-dark': '#000000',
        'border-color': '#e5e5e5',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '2.5rem',
        },
        screens: {
          '2xl': '1400px',
        },
      },
      height: {
        'header': '80px',
      },
      // ... o resto da sua configuração de tema (keyframes, etc)
    },
  },
  plugins: [],
};

export default config;