import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import tailwindPlugin from "eslint-plugin-tailwindcss";

const config = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  ...tailwindPlugin.configs["flat/recommended"],

  {
    rules: {
      "tailwindcss/no-trailing-exclamation": "error", // Bans old v3 syntax (e.g., `class!`)
      "tailwindcss/no-contradicting-classname": "error", // Good rule to have
    },
  },
];

export default config;