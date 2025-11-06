import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import tailwindPlugin from "eslint-plugin-tailwindcss";

const config = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  ...tailwindPlugin.configs["flat/recommended"],

  {
    settings: {
      tailwindcss: {
        config: false, // Tailwind CSS v4 tooling not yet supported by the plugin; skip config resolution to avoid noise
      },
    },
    rules: {
      "tailwindcss/no-contradicting-classname": "error", // Keep core clash detection
      "tailwindcss/no-custom-classname": "off", // Allow design system utility classes defined outside Tailwind
      "tailwindcss/classnames-order": "off", // Disable order rule until Tailwind v4 plugin support lands
    },
  },
];

export default config;