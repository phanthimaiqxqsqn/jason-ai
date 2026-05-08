import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#020617",
        foreground: "#e2e8f0",
        card: "#0f172a",
        muted: "#1e293b",
        accent: "#06b6d4",
        primary: "#8b5cf6",
        success: "#10b981",
        danger: "#ef4444"
      },
      backgroundImage: {
        "hero-glow":
          "radial-gradient(circle at 20% 10%, rgba(139,92,246,0.24), transparent 35%), radial-gradient(circle at 80% 0%, rgba(6,182,212,0.18), transparent 30%)"
      },
      boxShadow: {
        cinematic: "0 20px 65px -24px rgba(139,92,246,0.5)"
      },
      animation: {
        "pulse-soft": "pulseSoft 3s ease-in-out infinite",
        float: "float 7s ease-in-out infinite",
        shimmer: "shimmer 2.4s linear infinite"
      },
      keyframes: {
        pulseSoft: {
          "0%, 100%": { opacity: "0.45" },
          "50%": { opacity: "1" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" }
        }
      }
    }
  },
  plugins: []
};

export default config;
