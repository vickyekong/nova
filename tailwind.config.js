/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#FAF8F4',
          dark: '#F0EBE3',
          deeper: '#E8E2D8',
        },
        ink: {
          DEFAULT: '#1A1A1A',
          soft: '#3D3D3D',
          muted: '#6B6B6B',
        },
        nova: {
          DEFAULT: '#FF6B35',
          dark: '#E85A28',
          light: '#FF8A5C',
          glow: 'rgba(255, 107, 53, 0.25)',
        },
      },
      fontFamily: {
        display: ['Satoshi', 'system-ui', 'sans-serif'],
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        nova: '12px',
        'nova-lg': '16px',
        'nova-xl': '24px',
      },
      boxShadow: {
        spark: '0 0 0 4px rgba(255, 107, 53, 0.15), 0 8px 24px rgba(255, 107, 53, 0.2)',
        soft: '0 4px 24px rgba(26, 26, 26, 0.06)',
        lift: '0 20px 50px rgba(26, 26, 26, 0.12)',
      },
      backgroundImage: {
        'ignition-radial':
          'radial-gradient(ellipse 80% 50% at 70% 20%, rgba(255, 107, 53, 0.12), transparent 60%)',
        'ignition-line':
          'linear-gradient(135deg, transparent 40%, rgba(255, 107, 53, 0.08) 50%, transparent 60%)',
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
          '100%': { transform: 'scale(1.35)', opacity: '0' },
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
