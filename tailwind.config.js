export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Modern sophisticated palette
        blush: '#f8e8e4',
        cream: '#f7f2ed',
        sage: '#a7c59d',
        sand: '#d9cfc3',
        charcoal: '#1a1a1a',
        // Additional modern colors
        accent: '#d4a5a5',
        'accent-light': '#f0e0dd',
        'text-primary': '#1a1a1a',
        'text-secondary': '#666666',
        'text-tertiary': '#999999',
        'border-light': '#e8e8e8',
      },
      boxShadow: {
        soft: '0 10px 30px rgba(89, 79, 74, 0.08)',
        'soft-lg': '0 20px 50px rgba(89, 79, 74, 0.12)',
        'sm-light': '0 2px 8px rgba(0, 0, 0, 0.04)',
        'glow': '0 0 40px rgba(167, 197, 157, 0.15)',
      },
      backgroundImage: {
        'gradient-subtle': 'linear-gradient(135deg, #f8e8e4 0%, #f7f2ed 50%, #e8dcd5 100%)',
        'gradient-accent': 'linear-gradient(135deg, #a7c59d 0%, #d4a5a5 100%)',
        'gradient-warm': 'linear-gradient(135deg, #f8e8e4 0%, #f0e0dd 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'gradient-shift': 'gradientShift 6s ease infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      borderRadius: {
        'xl-soft': '24px',
        '2xl-soft': '32px',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      fontSize: {
        'display-sm': ['2.5rem', { lineHeight: '1.2', fontWeight: '700' }],
        'display': ['3rem', { lineHeight: '1.2', fontWeight: '700' }],
        'display-lg': ['3.75rem', { lineHeight: '1.1', fontWeight: '700' }],
      },
      transitionDuration: {
        '350': '350ms',
      },
    },
  },
  plugins: [],
};