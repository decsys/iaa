import babel from "rollup-plugin-babel";
import { terser } from "rollup-plugin-terser";

import pkg from "./package.json";

export default {
  input: "src/iaa.js",
  output: {
    file: pkg.module,
    format: "esm",
    sourcemap: true
  },
  plugins: [babel({ ...pkg.babel, exclude: "node_modules/**" }), terser()]
};
