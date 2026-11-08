import {defineConfig} from 'rolldown';
import {banner} from './src/banner.js';

export default defineConfig({
  input: './src/main.js',
  output: {
    file: './lib/main.js',
    format: 'iife',
    banner
  }
});