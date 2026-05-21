/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Manrope", "Plus Jakarta Sans", "ui-sans-serif", "system-ui"],
        display: ["Space Grotesk", "Manrope", "ui-sans-serif", "system-ui"],
      },
      colors: {
        ink: "#07111f",
        night: "#0a1020",
        cyanova: "#20e6ff",
        violetnova: "#8b5cf6",
        mintnova: "#3df7a8",
        glass: "rgba(255, 255, 255, 0.08)",
      },
      boxShadow: {
        glow: "0 0 34px rgba(32, 230, 255, 0.28)",
        violet: "0 0 42px rgba(139, 92, 246, 0.26)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: 0.35 },
          "50%": { opacity: 0.8 },
        },
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        pulseGlow: "pulseGlow 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
