/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: "tw-",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0f5ff",
          100: "#e5edff",
          200: "#cddbfe",
          300: "#b4c6fc",
          400: "#8da2fb",
          500: "#4361ee",
          600: "#2f49d1",
          700: "#2338a8",
          800: "#1b2c86",
          900: "#152269",
        },
        kakao: "#FEE500",
        skt: "#004fe5",
        kb: "#6d5a49",
        cj: "#22553b",
        lpoint: "#00a3e0",
      },
      fontFamily: {
        sans: ["Pretendard", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      boxShadow: {
        "soft-card": "0 20px 40px -15px rgba(67, 97, 238, 0.08), 0 0 1px 1px rgba(67, 97, 238, 0.05)",
        "glow-blue": "0 0 35px -5px rgba(67, 97, 238, 0.35)",
        "float-node": "0 12px 28px rgba(35, 56, 168, 0.12), 0 2px 8px rgba(0, 0, 0, 0.04)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/container-queries")],
};
