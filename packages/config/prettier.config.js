module.exports = {
  bracketSpacing: true,
  bracketSameLine: true,
  singleQuote: false,
  jsxSingleQuote: false,
  trailingComma: "all",
  semi: true,
  printWidth: 90,
  arrowParens: "always",
  endOfLine: "auto",
  importOrder: [
    "^reflect-metadata$",
    "(.*)/__mocks__/(.*)",
    "node:*",
    "<THIRD_PARTY_MODULES>",
    "^@app/(.*)$",
    "^@package/(.*)$",
    "^@module/(.*)$",
    "^~/(.*)$",
    "^@/(.*)$",
    "^[./]",
  ],
  plugins: ["@trivago/prettier-plugin-sort-imports", "prettier-plugin-tailwindcss"],
  overrides: [
    {
      files: "*.tsx",
      options: {
        parser: "babel-ts",
      },
    },
  ],
};
