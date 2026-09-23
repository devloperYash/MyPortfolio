/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0A0E1A',
        surface: '#12182B',
        text: '#E8EAF0',
        'text-primary': '#E8EAF0',
        'accent-gold': '#D9A441',
        'accent-blue': '#4C7EFF',
        muted: '#6B7280',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'gold-glow': '0 0 50px -10px rgba(217, 164, 65, 0.25)',
        'gold-glow-lg': '0 0 70px -5px rgba(217, 164, 65, 0.35)',
      },
    },
  },
  plugins: [],
}
