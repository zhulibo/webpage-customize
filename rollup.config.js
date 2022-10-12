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

// todo UserScript注释放在头部 b站自动全屏
