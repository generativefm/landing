import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';

const config = {
  input: 'src/sw.js',
  output: {
    dir: 'dist',
    format: 'iife',
  },
  plugins: [json(), terser()],
};

export default config;
