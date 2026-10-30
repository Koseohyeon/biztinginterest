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
        // 비즈팅 소개 페이지(BiztalkBiztingIntro)용 중립 색상
        ink: { DEFAULT: "#171d2b", 2: "#3a4456" },
        mute: "#6b7586",
        line: { DEFAULT: "#e4e7ec", 2: "#cfd4dc" },
        soft: "#f5f6f8",
        night: "#121826",
        kakao: "#FEE500",
        skt: "#004fe5",
        kb: "#6d5a49",
        cj: "#22553b",
        lpoint: "#00a3e0",
      },
      fontFamily: {
        sans: ["Pretendard", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      maxWidth: { page: "1200px" },
      keyframes: {
        float:   { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } },
        rise:    { from: { transform: "translateY(108%)" }, to: { transform: "translateY(0)" } },
        pop:     { from: { opacity: "0", transform: "translateY(10px) scale(.985)" }, to: { opacity: "1", transform: "none" } },
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        nudge:   { "0%,100%": { transform: "translateX(0)" }, "50%": { transform: "translateX(5px)" } },
        ring:    { "0%": { boxShadow: "0 0 0 0 rgba(67,97,238,.5)" }, "100%": { boxShadow: "0 0 0 12px rgba(67,97,238,0)" } },
        blink:   { "0%,100%": { opacity: "1" }, "50%": { opacity: ".35" } },
        sweep:   { from: { backgroundPosition: "200% 0" }, to: { backgroundPosition: "-200% 0" } },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out -2s infinite",
        rise: "rise .95s cubic-bezier(.2,.7,.2,1) both",
        pop: "pop .45s cubic-bezier(.2,.7,.2,1) both",
        marquee: "marquee 48s linear infinite",
        nudge: "nudge 1.2s ease-in-out infinite",
        ring: "ring 1.6s ease-out infinite",
        blink: "blink 1.6s ease-in-out infinite",
        sweep: "sweep 3.4s linear infinite",
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
