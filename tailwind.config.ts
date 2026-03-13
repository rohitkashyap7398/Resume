import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans:    ['var(--font-sans)',    'system-ui'],
        display: ['var(--font-display)', 'sans-serif'],
        mono:    ['var(--font-mono)',    'monospace'],
      },
      colors: {
        bg:      '#0d0a0f',
        surface: '#1a1020',
        pink:    '#ff2d78',
        yellow:  '#ffd60a',
        orange:  '#ff7d1a',
        purple:  '#c026d3',
        muted:   '#6b4d60',
      },
    },
  },
  plugins: [],
}
export default config
