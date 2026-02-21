import recipes from "@/components/ui/recipes";
import { defineConfig, SemanticTokens } from "@pandacss/dev";

const semanticTokens: SemanticTokens = {
  fonts: {
    body: { value: "var(--body)" },
    title: { value: "var(--title)" },
    header: { value: "var(--header)" },
  },
  // Example: Set primary color to another value
  colors: {
    brand: {
      primary: { value: "#FAF7F0" },
      secondary: { value: "#4A4947" },
      highlight: { value: "#D8D2C2" },
      shadow: { value: "#B17457" },
    },
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
    surface: {
      page: { value: "#1C1917" },
      raised: { value: "#292524" },
      overlay: { value: "rgba(28,25,23,0.85)" },
      muted: { value: "#44403C" },
    },
    text: {
      primary: { value: "#FAF7F0" },
      secondary: { value: "#A8A29E" },
      muted: { value: "#78716C" },
      inverse: { value: "#1C1917" },
    },
    accent: {
      gold: { value: "#D4A853" },
      goldHover: { value: "#E0BC6A" },
      ember: { value: "#C2410C" },
      teal: { value: "#2DD4BF" },
    },
    status: {
      beta: { value: "#3B82F6" },
      alpha: { value: "#EAB308" },
      new: { value: "#22C55E" },
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
      top: "-400px",
      left: "500px", // Random left position across the viewport width
    },
    "100%": {
      top: "100vh",
      left: "random(0%, 100%)", // Optional: cards can move horizontally as they fall
    },
  },
  sway: {
    "0%": { transform: "rotate(0deg)", opacity: 0 },
    "5%": {
      opacity: 1,
    },
    "100%": { transform: "rotate(10deg)" },
  },
  spin: {
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" },
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
    textStyles: {
      body: {
        description: "default font",
        value: { fontFamily: "var(--body)" },
      },
    },
  },

  outdir: "styled-system",
});
