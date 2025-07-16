import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Paleta de cores semântica e profissional para o MODO DARK
        background: '#111827', // Cinza escuro principal (Ex: bg-gray-900)
        surface: '#1f2937',    // Cinza um pouco mais claro para cards, modais (Ex: bg-gray-800)
        'surface-hover': '#374151', // Efeito hover para superfícies (Ex: bg-gray-700)
        
        primary: '#dc2626',      // Vermelho Nike como cor primária/acento principal
        'primary-hover': '#b91c1c', // Variação mais escura para hover
        
        // Cores de texto
        'text-primary': '#f9fafb',   // Branco/cinza muito claro para texto principal
        'text-secondary': '#9ca3af', // Cinza médio para texto secundário, placeholders
        'text-tertiary': '#6b7280',  // Cinza mais escuro para informações menos importantes

        border: '#374151',       // Cor para bordas sutis
        'border-hover': '#4b5563', // Cor de borda para hover

        // Cores de feedback
        success: '#16a34a',
        warning: '#d97706',
        error: '#ef4444',
      },
      fontFamily: {
        sans: [
          'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont',
          'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'
        ],
        mono: [
          'JetBrains Mono', 'Fira Code', 'Monaco', 'Consolas', 
          'Liberation Mono', 'Courier New', 'monospace'
        ],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '2.5rem',
          xl: '3rem',
          '2xl': '3.5rem',
        },
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1400px',
        },
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.1), 0 10px 20px -2px rgba(0, 0, 0, 0.08)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
        'hard': '0 10px 40px -10px rgba(0, 0, 0, 0.3)',
        'glow-primary': '0 0 20px rgba(220, 38, 38, 0.5)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-in-out forwards',
        'slide-up': 'slideUp 0.3s ease-out forwards',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
      },
    },
  },
  plugins: [
    function({ addComponents }: any) {
      const newComponents = {
        '.btn': {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          padding: '0.75rem 1.5rem',
          fontSize: '0.875rem',
          fontWeight: '600',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          borderRadius: '0.5rem',
          cursor: 'pointer',
          transition: 'all 0.2s ease-in-out',
          position: 'relative',
          overflow: 'hidden',
          transform: 'translateZ(0)', // GPU acceleration
        },
        '.btn-primary': {
          backgroundColor: 'var(--primary, #dc2626)',
          color: 'var(--text-on-primary, #ffffff)', // Cor do texto em botões primários
          '&:hover': {
            backgroundColor: 'var(--primary-hover, #b91c1c)',
            transform: 'translateY(-2px)',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.2)',
          },
        },
        '.btn-secondary': {
          backgroundColor: 'transparent',
          color: 'var(--text-primary, #f9fafb)',
          border: '2px solid var(--border, #374151)',
          '&:hover': {
            backgroundColor: 'var(--surface-hover, #374151)',
            borderColor: 'var(--border-hover, #4b5563)',
          },
        },
        '.card': {
          backgroundColor: 'var(--surface, #1f2937)',
          borderRadius: '1rem',
          transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
          '&:hover': {
            transform: 'translateY(-6px)',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
          },
        },
        '.input': {
          width: '100%',
          padding: '0.75rem 1rem',
          backgroundColor: 'var(--surface-hover, #374151)',
          color: 'var(--text-primary, #f9fafb)',
          border: '1px solid var(--border, #374151)',
          borderRadius: '0.5rem',
          fontSize: '0.875rem',
          transition: 'all 0.2s ease-in-out',
          '&:focus': {
            outline: 'none',
            borderColor: 'var(--primary, #dc2626)',
            boxShadow: '0 0 0 3px rgba(220, 38, 38, 0.2)',
          },
          '&::placeholder': {
            color: 'var(--text-secondary, #9ca3af)',
          },
        },
      };

      addComponents(newComponents);
    }
  ],
};

export default config;