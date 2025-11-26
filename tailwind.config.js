/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0b1020",
        surface: "#0f1724",
        muted: "#9aa4b2",
        accent: "#6ee7b7",
        card: "#111827",
        glass: "rgba(255,255,255,0.03)"
      },
      borderRadius: {
        xl: "1rem"
      },
      boxShadow: {
        soft: "0 6px 18px rgba(2,6,23,0.6)",
        lifted: "0 10px 30px rgba(2,6,23,0.7)"
      }
    }
  },
  plugins: []
};
