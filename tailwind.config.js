/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue'
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif']
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
}