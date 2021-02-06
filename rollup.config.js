import {resolve} from "path";
import {terser} from "rollup-plugin-terser";

export default {
  external: [
    "fs",
    "path",
    "http"
  ],
  input: resolve(process.cwd(), "sources", "serve.mjs"),
  output: {
    banner: "#!/usr/bin/env node",
    file: resolve(process.cwd(), "binary", "serve.mjs"),
    format: "esm"
  },
  plugins: [
    terser()
  ]
};
