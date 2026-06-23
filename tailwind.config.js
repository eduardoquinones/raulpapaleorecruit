/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0D1B3E',
          soft: '#4A5578',
          muted: '#8892AA',
        },
        deep: {
          DEFAULT: '#0D1B3E',
          light: '#16285C',
        },
        electric: {
          DEFAULT: '#2B5CE6',
          light: '#4F7BFF',
          dark: '#1E3FA8',
        },
        gold: {
          DEFAULT: '#E8A020',
          light: '#F2B548',
          dark: '#B97A0F',
        },
        status: {
          saved: '#2B5CE6',
          contacted: '#EA580C',
          committed: '#16A34A',
        },
        mist: '#F7F8FB',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #0D1B3E 0%, #1E3A6E 50%, #2B5CE6 100%)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '20px',
        btn: '12px',
        pill: '50px',
      },
      boxShadow: {
        glass: '0 8px 32px rgba(13,27,62,0.08)',
        'glass-lg': '0 16px 48px rgba(13,27,62,0.14)',
        'glass-dark': '0 8px 32px rgba(13,27,62,0.35)',
      },
      backdropBlur: {
        glass: '16px',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'slide-in-right': 'slideInRight 0.35s ease-out forwards',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
        'fill-bar': 'fillBar 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'float-in': 'floatIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-glow': 'pulseGlow 1.4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        floatIn: {
          '0%': { opacity: 0, transform: 'translateY(16px) scale(0.97)' },
          '100%': { opacity: 1, transform: 'translateY(0) scale(1)' },
        },
        pulseGlow: {
          '0%, 100%': { filter: 'drop-shadow(0 0 0 rgba(43,92,230,0))' },
          '50%': { filter: 'drop-shadow(0 0 6px rgba(43,92,230,0.45))' },
        },
        slideUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: 0, transform: 'translateX(40px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: 0, transform: 'scale(0.96)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
        fillBar: {
          '0%': { width: '0%' },
          '100%': { width: 'var(--fill-width, 100%)' },
        },
      },
    },
  },
  plugins: [],
}
