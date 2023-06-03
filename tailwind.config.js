/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'Noto Sans JP', 'sans-serif'],
        'serif': ['Shippori Mincho', 'serif'],
      }
    },
  },
  plugins: [],
}

