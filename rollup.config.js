import {resolve} from "path";
import {terser} from "rollup-plugin-terser";

export default {
  input: resolve(process.cwd(), "sources", "serve.mjs"),
  plugins: [
    terser()
  ],
  external: [
    "fs",
    "path",
    "http"
  ],
  output: {
    file: resolve(process.cwd(), "binary", "serve.mjs"),
    format: "esm",
    banner: "#!/usr/bin/env node"
  }
}
