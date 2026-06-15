import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: "#FBF9F4",
          soft: "#F2EFE6",
          line: "#E4DFD2",
        },
        ink: {
          DEFAULT: "#211E1A",
          soft: "#4A463E",
          faint: "#8A8478",
        },
        chalk: {
          DEFAULT: "#15171C",
          soft: "#1D2027",
          line: "#2C313B",
        },
        marker: {
          DEFAULT: "#2F6BD6",
          deep: "#1E4FA8",
        },
        highlight: "#FFE08A",
        coral: "#E8654B",
        leaf: "#3F9E6E",
      },
      fontFamily: {
        hand: ["var(--font-hand)", "cursive"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        sketch: "255px 15px 225px 15px / 15px 225px 15px 255px",
        "sketch-2": "15px 225px 15px 255px / 255px 15px 225px 15px",
      },
      boxShadow: {
        sketch: "3px 4px 0 0 var(--sketch-shadow)",
        "sketch-sm": "2px 2px 0 0 var(--sketch-shadow-sm)",
        "sketch-lg": "6px 7px 0 0 var(--sketch-shadow-lg)",
      },
      rotate: {
        "1.5": "1.5deg",
        "-1.5": "-1.5deg",
      },
    },
  },
  plugins: [typography],
};

export default config;
