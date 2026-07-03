module.exports = function (api) {
  api.cache(true);

  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          alias: {
            "@": "./src",
          },
          extensions: [
            ".ios.ts",
            ".android.ts",
            ".ts",
            ".tsx",
            ".js",
            ".jsx",
            ".json",
          ],
        },
      ],
    ],
  };
};