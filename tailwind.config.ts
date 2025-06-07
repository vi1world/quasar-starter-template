import type { Config } from "tailwindcss"
import defaultTheme from "tailwindcss/defaultTheme";

export default <Config> {
  darkMode: 'class',
  content: [
    './src/**/*.{js,vue,ts}',
    "./src/layouts/**/*.vue",
    "./src/pages/**/*.vue",
    "./src/components/**/*.{js,ts,vue}",
    "./src/App.vue",
  ],
  safelist: [
    'scroll-pt-20',
    'scroll-pt-24',
    'scroll-pt-32',
    'lg:scroll-pt-4',
    'lg:scroll-pt-20',
    'lg:scroll-pt-24',
  ],
  theme: {
    screens: {
      'xs': '475px',
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        // True Contra color palette - Yellow and Black dominant
        primary: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#ffbd12', // Lightning Yellow - Primary
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        },
        'accent': {
          '50': '#fcffe5',
          '100': '#f6ffc7',
          '200': '#ecff95',
          '300': '#dcfe58',
          '400': '#c9f526',
          '500': '#aadc06',
          '600': '#86b300',
          '700': '#638506',
          '800': '#4f690b',
          '900': '#42580f',
          '950': '#223201',
        },
        // Contra black variations
        'contra-black': {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#000000', // Pure Black
        },
        // Supporting colors (minimal use)
        electric: {
          500: '#00c6ae', // Caribbean Green - accent only
        },
        coral: {
          500: '#f95a2c', // Flamingo Red - accent only
        },
        blue: {
          500: '#1947e6', // Persian Blue - accent only
        },
      },
      screens: {
        '3xl': '1970px',
      },
      backdropBlur: {
        'lg': '16px',
      },
      fontWeight: {
        'extra-bold': '800',
        'black': '900',
      },
      fontSize: {
        'hero': ['4rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'headline': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '2.5rem',
      },
      boxShadow: {
        'contra': '0 4px 0 0 #000000', // Black shadow for yellow elements
        'contra-lg': '0 6px 0 0 #000000',
        'contra-black': '0 4px 0 0 #ffbd12', // Yellow shadow for black elements
        'electric': '0 4px 0 0 #000000',
        'coral': '0 4px 0 0 #000000',
        'blue': '0 4px 0 0 #000000',
        'card': '0 4px 0 0 #000000',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    fontFamily: {
      ...defaultTheme.fontFamily,
      'title': ['Montserrat', 'var(--mi-localized-font, \'\')', ...defaultTheme.fontFamily.sans],
      'sans': ['Montserrat', 'var(--mi-localized-font, \'\')', ...defaultTheme.fontFamily.sans],
      'content-sans': ['Montserrat', 'var(--mi-localized-font-p, var(--mi-localized-font))', ...defaultTheme.fontFamily.sans],
      'heading': ['Montserrat', 'sans-serif'],
      'body': ['Montserrat', 'sans-serif'],
      'display': ['Montserrat', 'sans-serif'],
    }
  },
  plugins: [],
}
