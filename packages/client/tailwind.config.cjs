/** @type {import('tailwindcss').Config} */

module.exports = {
  mode: "jit",
  darkMode: "class",
  content: [
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        15: "repeat(15, minmax(0, 1fr))",
        16: "repeat(16, minmax(0, 1fr))"
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ],
}
