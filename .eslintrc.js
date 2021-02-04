"use strict";

module.exports = {
  "extends": "eslint:recommended",
  overrides: [
    {
      files: ["*.js"],
      env: {
        node: true,
        commonjs: true
      },
      parserOptions: {
        impliedStrict: false
      }
    },
    {
      files: ["*.mjs", "rollup.config.js"],
      env: {
        node: true,
        es2021: true
      },
      parserOptions: {
        sourceType: "module",
        ecmaVersion: 12
      }
    }
  ],
  "rules": {
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
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
