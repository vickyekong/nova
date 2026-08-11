/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Perfect white
        cream: {
          DEFAULT: '#FFFFFF',
          dark: '#FFFFFF',
          deeper: '#FFFFFF',
        },
        // Outerspace — solid + alpha mixes only (no foreign greys)
        ink: {
          DEFAULT: '#2D3436',
          soft: 'rgb(45 52 54 / 0.72)',
          muted: 'rgb(45 52 54 / 0.5)',
        },
        // Warm red
        nova: {
          DEFAULT: '#E23D28',
          dark: '#E23D28',
          light: '#E23D28',
          glow: 'rgb(226 61 40 / 0.28)',
          ice: '#FFFFFF',
        },
      },
      fontFamily: {
        display: ['Clash Display', 'Satoshi', 'system-ui', 'sans-serif'],
        sans: ['Satoshi', 'DM Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        nova: '8px',
        'nova-lg': '12px',
        'nova-xl': '16px',
      },
      boxShadow: {
        spark: '0 0 0 3px rgb(226 61 40 / 0.2), 0 10px 28px rgb(226 61 40 / 0.2)',
        soft: '0 8px 30px rgb(45 52 54 / 0.08)',
        lift: '0 24px 60px rgb(45 52 54 / 0.14)',
      },
      backgroundImage: {
        'ignition-radial':
          'radial-gradient(ellipse 70% 55% at 85% 15%, rgb(226 61 40 / 0.14), transparent 58%)',
        'ignition-line':
          'linear-gradient(115deg, transparent 42%, rgb(226 61 40 / 0.12) 50%, transparent 58%)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.9)', opacity: '0.5' },
          '100%': { transform: 'scale(1.4)', opacity: '0' },
        },
      },
      animation: {
        marquee: 'marquee var(--marquee-duration, 40s) linear infinite',
        'marquee-reverse':
          'marquee-reverse var(--marquee-duration, 40s) linear infinite',
        float: 'float 5s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2s ease-out infinite',
      },
    },
  },
  plugins: [],
};
