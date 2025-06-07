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
      },
      screens: {
        '3xl': '1970px',
      },
      backdropBlur: {
        'lg': '16px',
      },
    },
    fontFamily: {
      ...defaultTheme.fontFamily,
      'title': ['Capriola', 'var(--mi-localized-font, \'\')', ...defaultTheme.fontFamily.sans],
      'sans': ['Nunito', 'var(--mi-localized-font, \'\')', ...defaultTheme.fontFamily.sans],
      'content-sans': ['Nunito', 'var(--mi-localized-font-p, var(--mi-localized-font))', ...defaultTheme.fontFamily.sans],
    }
  },
  plugins: [],
}
