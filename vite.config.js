const path = require('path')

export default {
  build: {
    outDir: 'lib',
    lib: {
      entry: path.resolve(__dirname, 'src/main.js'),
      name: "webpage-customize",
      fileName: (format) => `main.${format}.js`
    },
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: false,
        drop_debugger: false,
        dead_code: false
      },
      format: {
        comments: true
      }
    }
  },
}
