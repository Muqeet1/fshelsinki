module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    jest: true,
    "cypress/globals": true
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: 13,
  },
  plugins: [ "react", "jest", "cypress" ],
  rules: {
    indent: ["error", 2],
    "linebreak-style": ["error", "windows"],
    quotes: ["error", "double"],
    semi: ["error", "never"],
  },
}
