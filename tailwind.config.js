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
        primary1: 'var(--color-primary-1)',
        primary2: 'var(--color-primary-2)',
        secondary1: 'var(--color-secondary-1)',
        secondary2: 'var(--color-secondary-2)',
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

