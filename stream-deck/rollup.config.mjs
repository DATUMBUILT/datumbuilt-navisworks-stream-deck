import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default {
  input: "src/plugin.ts",
  output: {
    file: "com.victorcastillo.datumbuilt.navisworks.sdPlugin/bin/plugin.js",
    format: "esm",
    sourcemap: true
  },
  external: ["node:net", "node:fs", "node:os", "node:path"],
  plugins: [nodeResolve(), commonjs(), typescript()]
};
