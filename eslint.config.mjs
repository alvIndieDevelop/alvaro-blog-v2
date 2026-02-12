import nextPlugin from "@next/eslint-plugin-next";
import tseslint from "typescript-eslint";
import js from "@eslint/js";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      "no-console": "warn",
      "no-debugger": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
  {
    ignores: [".next/*", "node_modules/*"],
  },
];
