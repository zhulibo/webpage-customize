// import {terser} from "rollup-plugin-terser";

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
    // })
  ]
}
