import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black: '#000000',
        gray: {
          900: '#111111',
          800: '#1a1a1a',
          700: '#2a2a2a',
          600: '#4a4a4a',
          500: '#6a6a6a',
          400: '#8a8a8a',
          300: '#a0a0a0',
          200: '#cccccc',
          100: '#f5f5f5',
          50: '#fafafa',
        },
        white: '#ffffff',
      },
      fontFamily: {
        sans: ['var(--font-pretendard)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
