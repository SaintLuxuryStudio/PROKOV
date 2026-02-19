import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter Variable", "Inter", ...defaultTheme.fontFamily.sans],
        serif: [
          "Playfair Display Variable",
          "Playfair Display",
          ...defaultTheme.fontFamily.serif
        ],
        mono: ["JetBrains Mono", "Fira Code", ...defaultTheme.fontFamily.mono]
      },
      colors: {
        ink: {
          950: "#0a0a0a",
          900: "#0f0f0f",
          850: "#141414",
          800: "#1a1a1a",
          700: "#242424",
          600: "#333333",
          500: "#666666",
          400: "#888888",
          300: "#a9a9a9",
          200: "#cccccc",
          100: "#ededed",
          50: "#f5f5f5"
        },
        signal: {
          900: "#4a0d0d",
          800: "#6b1111",
          700: "#8e1b1b",
          600: "#a82222",
          500: "#c43333",
          400: "#e05555",
          300: "#f0a0a0",
          200: "#f2c7c7",
          100: "#fce8e8"
        },
        phase: {
          tourist: "#2d6a4f",
          vagrant: "#b08d3e",
          psychosis: "#8e1b1b"
        },
        severity: {
          low: "#2d6a4f",
          moderate: "#b08d3e",
          high: "#c44e1a",
          critical: "#8e1b1b",
          extreme: "#6b0f1a"
        },
        evidence: {
          video: "#3b82f6",
          behavioral: "#8b5cf6",
          testimony: "#10b981",
          operative: "#f59e0b"
        }
      },
      boxShadow: {
        dossier: "0 30px 80px rgba(0, 0, 0, 0.45)",
        panel: "inset 0 0 0 1px rgba(255,255,255,0.06)",
        "glow-red": "0 0 20px rgba(142, 27, 27, 0.4)",
        "glow-red-lg": "0 0 40px rgba(142, 27, 27, 0.6)"
      },
      animation: {
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "scan-line": "scanLine 4s linear infinite",
        "draw-line": "drawLine 1.5s ease-out forwards"
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 15px rgba(142, 27, 27, 0.3)" },
          "50%": { boxShadow: "0 0 30px rgba(142, 27, 27, 0.6)" }
        },
        scanLine: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" }
        },
        drawLine: {
          "0%": { strokeDashoffset: "1000" },
          "100%": { strokeDashoffset: "0" }
        }
      }
    }
  },
  plugins: []
} satisfies Config;
