/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Anthropic brand colors
        primary: {
          50: "#fdf6f4",
          100: "#fae8e3",
          200: "#f6d2c8",
          300: "#efb3a2",
          400: "#e68b73",
          500: "#d97757", // Anthropic Clay
          600: "#c85e3e",
          700: "#a74930",
          800: "#893e2b",
          900: `#703627`,
          950: "#3d1a12",
        },
        // Anthropic cream/beige accent
        cream: {
          50: "#fdfbf7",
          100: "#faf9f5", // Light
          200: "#e8e6dc", // Light Gray
          300: "#dcd9cd",
          400: "#b0aea5", // Mid Gray
          500: "#828179", // Friar Gray
          900: "#141413", // Dark
        },
        accent: {
          blue: "#6a9bcc",
          green: "#788c5d",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        mono: ["JetBrains Mono", "Fira Code", "Consolas", "monospace"],
      },
    },
  },
  plugins: [],
};
