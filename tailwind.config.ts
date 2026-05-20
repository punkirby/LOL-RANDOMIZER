import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#05070d",
        hextech: "#0ac8b9",
        gold: "#c89b3c",
        ember: "#f26d3d",
        arcane: "#6c5ce7",
        panel: "rgba(10, 18, 31, 0.72)"
      },
      boxShadow: {
        glow: "0 0 42px rgba(10, 200, 185, 0.28)",
        gold: "0 0 34px rgba(200, 155, 60, 0.24)"
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-sans-serif", "system-ui"],
        body: ["var(--font-body)", "ui-sans-serif", "system-ui"]
      },
      animation: {
        "spin-slow": "spin 18s linear infinite",
        shimmer: "shimmer 2.7s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        pulseGlow: "pulseGlow 2.2s ease-in-out infinite"
      },
      keyframes: {
        shimmer: {
          "0%, 100%": { opacity: "0.55", transform: "translateX(-20%)" },
          "50%": { opacity: "1", transform: "translateX(20%)" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" }
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 24px rgba(10, 200, 185, 0.22)" },
          "50%": { boxShadow: "0 0 64px rgba(10, 200, 185, 0.46)" }
        }
      }
    }
  },
  plugins: []
};

export default config;
