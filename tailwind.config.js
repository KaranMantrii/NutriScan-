export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "oklch(0.78 0.19 152)",
        background: "oklch(0.16 0.02 160)",
        foreground: "oklch(0.97 0.01 150)",
      },
      borderRadius: {
        lg: "1rem",
      },
      boxShadow: {
        glow: "0 0 60px -10px oklch(0.78 0.19 152 / 0.5)",
      },
    },
  },
  plugins: [],
};