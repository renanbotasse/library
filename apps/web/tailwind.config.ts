import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        serif:   ["var(--font-cormorant)", "Georgia", "serif"],
        sans:    ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        body:    ["var(--font-cormorant)", "Georgia", "serif"],
      },
      colors: {
        bg:      "#0B0A0F",
        surface: "#15131B",
        card:    "#211C29",
        overlay: "#2A2535",
        text:    "#F5F0E6",
        muted:   "#C9C1B4",
        wine:    "#6B1F33",
        purple:  "#4B2E5E",
        moss:    "#314338",
        gold:    "#A3824A",
        rose:    "#C88C9A",
      },
      boxShadow: {
        gold:   "0 0 24px rgba(163,130,74,0.2)",
        wine:   "0 0 20px rgba(107,31,51,0.3)",
        deep:   "0 24px 64px rgba(0,0,0,0.7)",
        frame:  "inset 0 0 0 1px rgba(163,130,74,0.18)",
      },
      backgroundImage: {
        "noise": "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
        "vignette": "radial-gradient(ellipse at center, transparent 40%, rgba(11,10,15,0.85) 100%)",
        "gold-shimmer": "linear-gradient(90deg, #A3824A 0%, #D4B483 45%, #A3824A 55%, #7A5F2E 100%)",
      },
      animation: {
        "float":       "float 7s ease-in-out infinite",
        "float-slow":  "float 11s ease-in-out infinite 1.5s",
        "float-delay": "float 9s ease-in-out infinite 3s",
        "shimmer":     "shimmer 3s linear infinite",
        "flicker":     "flicker 4s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "40%":      { transform: "translateY(-14px) rotate(1.2deg)" },
          "70%":      { transform: "translateY(-7px) rotate(-0.8deg)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "45%":      { opacity: "0.85" },
          "50%":      { opacity: "0.95" },
          "55%":      { opacity: "0.8" },
          "60%":      { opacity: "1" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
