/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,svx,ts}"],
  theme: {
    extend: {
      fontFamily: {
        'sans': ["'InterVariable'", "'Noto Sans JP Variable'", 'sans-serif'],
        'serif': ["'Shippori Mincho'", 'serif'],
        'mono': ["'JetBrains Mono Variable'", "'Noto Sans JP Variable'", 'monospace'],
      },
    },
  },
  plugins: [],
}

