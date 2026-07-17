import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0A0E14",
        "ink-soft": "#131A26",
        "ink-line": "rgba(245, 246, 247, 0.12)",
        paper: "#F5F6F7",
        offwhite: "#F7F6F3",
        mist: "#F1F0ED",
        graphite: "#5B6270",
        hairline: "rgba(10, 14, 20, 0.08)",
        red: {
          DEFAULT: "#E10600",
          soft: "#FF3B30",
        },
        slate: {
          DEFAULT: "#8892A0",
          light: "#B7BFC9",
        },
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      letterSpacing: {
        widest2: "0.25em",
      },
      maxWidth: {
        content: "1440px",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        drift: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(8px)" },
        },
      },
      animation: {
        "fade-in-up": "fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both",
        drift: "drift 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
