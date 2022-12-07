// import {terser} from "rollup-plugin-terser";
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: './src/main.js',
  output: {
    file: './lib/main.js',
    format: 'esm'
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
