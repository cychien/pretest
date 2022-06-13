const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    container: {
      padding: {
        DEFAULT: '16px',
        sm: '32px',
      },
    },
    spacing: {
      0: '0px',
      '2xs': '4px',
      xs: '8px',
      sm: '12px',
      md: '16px',
      lg: '24px',
      xl: '32px',
      '2xl': '48px',
      '3xl': '64px',
      '4xl': '96px',
      '5xl': '128px',
    },
    colors: {
      primary: colors.sky,
      gray: colors.slate,
      white: colors.white,
      success: colors.emerald,
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      bold: 700,
    },
    fontSize: {
      xs: ['0.75rem', '1rem'],
      sm: ['0.875rem', '1.25rem'],
      md: ['1rem', '1.5rem'],
      lg: ['1.125rem', '1.75rem'],
      xl: ['1.25rem', '1.75rem'],
      '2xl': ['1.5rem', '2rem'],
      '3xl': ['1.875rem', '2.25rem'],
      '4xl': ['2.25rem', '2.5rem'],
    },
    lineHeight: {
      normal: 1.5,
      relaxed: 1.7,
    },
  },
}
