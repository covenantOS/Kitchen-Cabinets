/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#1a2b4a',
          50: '#f0f3f8',
          100: '#dce3ee',
          200: '#b9c7dd',
          300: '#96abcc',
          400: '#738fbb',
          500: '#5073aa',
          600: '#3e5c88',
          700: '#2e4566',
          800: '#1f2f48',
          900: '#1a2b4a',
        },
        gold: {
          DEFAULT: '#c9a227',
          light: '#d4b84a',
          accessible: '#8B6914',
        },
      },
      fontFamily: {
        sans: ['"Inter Variable"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      maxWidth: {
        '7xl': '80rem',
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
        'fade-in': 'fade-in 0.6s ease-out forwards',
      },
    },
  },
  plugins: [],
};
