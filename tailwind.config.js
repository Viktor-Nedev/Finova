/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Nunito", "Poppins", "Inter", "ui-sans-serif", "system-ui"],
        display: ["Nunito", "Poppins", "Inter", "ui-sans-serif", "system-ui"],
      },
      colors: {
        "duo-green": "#16A34A",
        "duo-green-dark": "#12813B",
        "duo-green-light": "#58CC02",
        "duo-yellow": "#FBBF24",
        "duo-blue": "#1CB0F6",
        "duo-red": "#FF4B4B",
        "duo-bg": "#F6FBF4",
        "duo-soft": "#DCFCE7",
        "duo-gray": "#E5E7EB",
        "duo-sky": "#F7FBF2",
        "duo-ink": "#1F2937",
        "duo-brown": "#6B3A00",
      },
      boxShadow: {
        duo: "0 8px 0 rgba(18, 129, 59, 0.95)",
        soft: "0 18px 45px rgba(15, 23, 42, 0.08)",
      },
      gridTemplateColumns: {
        14: "repeat(14, minmax(0, 1fr))",
      },
      keyframes: {
        confettiFall: {
          "0%": { transform: "translate3d(0, -12vh, 0) rotate(0deg)", opacity: 1 },
          "100%": { transform: "translate3d(0, 112vh, 0) rotate(720deg)", opacity: 0 },
        },
      },
      animation: {
        confettiFall: "confettiFall 2.4s ease-in forwards",
      },
    },
  },
  plugins: [],
};
