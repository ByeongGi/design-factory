import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/templates/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        surface: 'var(--color-surface)',
        'on-primary': 'var(--color-on-primary)',
      },
      borderRadius: {
        DEFAULT: 'var(--border-radius)',
      },
      boxShadow: {
        'elevation-1': 'var(--shadow-elevation-1)',
      },
    },
  },
  plugins: [],
}

export default config
