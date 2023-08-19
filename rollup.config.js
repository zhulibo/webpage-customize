import { nodeResolve } from '@rollup/plugin-node-resolve';
import {banner} from "./src/banner.js";

export default {
  input: './src/main.js',
  output: {
    file: './lib/main.js',
    format: 'es',
    banner
  },
  plugins: [
    nodeResolve() // 把外部依赖块打入包内
  ]
}
