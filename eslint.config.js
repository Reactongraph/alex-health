// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");

module.exports = defineConfig([
  // Expo's config: bundles TypeScript, React, React Hooks and React Native rules.
  expoConfig,
  // Runs Prettier as an ESLint rule and disables ESLint rules that conflict with it.
  eslintPluginPrettierRecommended,
  {
    // Generated / vendored output that should never be linted.
    ignores: ["dist/*", "node_modules/*", ".expo/*", "expo-env.d.ts"],
  },
]);
