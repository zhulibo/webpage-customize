// import {terser} from "rollup-plugin-terser";
import { nodeResolve } from '@rollup/plugin-node-resolve';
import {userScript} from "./src/userScript";

export default {
  input: './src/main.js',
  output: {
    file: './lib/main.js',
    format: 'esm',
    banner: userScript,
  },
  plugins: [
    // terser({
    //   compress: false,
    //   format: {
    //     comments: true
    //   }
    // }),
    nodeResolve()
  ]
}
