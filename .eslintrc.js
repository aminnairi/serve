"use strict";

module.exports = {
  extends: "@aminnairi",
  overrides: [
    {
      env: {
        commonjs: true,
        node: true
      },
      files: ["*.js"],
      parserOptions: {
        impliedStrict: false
      }
    },
    {
      env: {
        es2021: true,
        node: true
      },
      files: ["*.mjs", "rollup.config.js"],
      parserOptions: {
        ecmaVersion: 12,
        sourceType: "module"
      }
    }
  ],
  rules: {
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "no-ternary": "off",
    "quotes": [
      "error",
      "double"
    ],
    "semi": [
      "error",
      "always"
    ]
  }
};
