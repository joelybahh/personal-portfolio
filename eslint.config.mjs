import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  ...nextCoreWebVitals,
  {
    rules: {
      "@next/next/no-img-element": "off",
      // New React Compiler rules in eslint-config-next 16.4 flag four existing
      // components (ThemeToggle, useInView, DoodleStudio, HighlightedTitle).
      // Warn until those are reworked; see the DEPOT Dependabot task.
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/refs": "warn",
      "react-hooks/immutability": "warn",
    },
  },
  { ignores: [".next/**", "dist/**", "node_modules/**"] },
];

export default eslintConfig;
