/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#e6f6ff",
          100: "#cceeff",
          200: "#99ddff",
          300: "#66ccff",
          400: "#33bbff",
          500: "#0ea5e9",
          600: "#1976d2",   // azul universitário
          700: "#145ea6",
          800: "#0f497f",
          900: "#0b365f"
        },
        coin: "#00C853"
      }
    },
  },
  plugins: [],
}
