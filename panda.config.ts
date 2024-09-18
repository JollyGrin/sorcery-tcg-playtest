import recipes from "@/components/ui/recipes";
import { defineConfig } from "@pandacss/dev";

const semanticTokens = {
  // Example: Set primary color to another value
  colors: {
    primary: {
      DEFAULT: {
        value: {
          // Light mode
          base: "{colors.grayscale.900}",
          // Dark mode
          _dark: "{colors.grayscale.50}",
        },
      },
    },
  },
};

const keyframes = {
  bgZoomOut: {
    "0%": { bgSize: "135%" },
    "100%": { bgSize: "120%" },
  },
  bgZoomIn: {
    "0%": { bgSize: "125%" },
    "100%": { bgSize: "135%" },
  },
  fall: {
    "0%": {
      top: "-150px",
      left: "500px", // Random left position across the viewport width
    },
    "100%": {
      top: "100vh",
      left: "random(0%, 100%)", // Optional: cards can move horizontally as they fall
    },
  },
  sway: {
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(10deg)" },
  },
};

export default defineConfig({
  // Required: Add the preset to your config.
  presets: ["@shadow-panda/preset"],

  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}"],

  // Use React
  jsxFramework: "react",

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: { semanticTokens, recipes, keyframes },
  },

  outdir: "styled-system",
});
