/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'Noto Sans JP', 'sans-serif'],
        'serif': ['Shippori Mincho', 'serif'],
        'mono': ['JetBrains Mono', 'Noto Sans JP', 'monospace'],
      }
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}

