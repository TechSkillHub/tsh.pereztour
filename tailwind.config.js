/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        theme1: 'var(--color-theme-1)',
        theme2: 'var(--color-theme-2)',
        theme3: 'var(--color-theme-3)',
        offWhite: 'var(--color-offWhite)',
        grayTheme: 'var(--color-grayTheme)',
        darkTheme: 'var(--color-darkTheme)',
        darkBg: 'var(--color-darkBg)',
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        error: 'var(--color-error)',
      },
      spacing: {
        header: 'var(--height-header)' 
      },
      height: {
        header: 'var(--height-header)'
      },
      backgroundColor: {
        header: 'var(--color-bg-header)',
        footer: 'var(--color-bg-footer)',
      },
      textColor: {
        header: 'var(--color-text-header)',
        footer: 'var(--color-text-footer)',
      },
      backgroundImage: {
        'vector1': "url('/assets/images/vector1.png')",
        'rightVector': "url('/assets/images/bg-right.png')",
        'leftVector': "url('/assets/images/bg-left.png')"
      },
      fontFamily: {
        'sans': ['Montserrat'],
        'brand': ['CenturyGothic'],
      },
    },
  },
  plugins: [],
}

