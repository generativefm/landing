'use strict';

const path = require('path');
const { default: babel } = require('@rollup/plugin-babel');

const createRollupConfig = (input) => ({
  input: path.join(__dirname, input),
  output: {
    dir: 'dist',
    format: 'cjs',
    exports: 'default',
  },
  plugins: [babel({ babelHelpers: 'bundled' })],
  external: [/react/],
});

module.exports = createRollupConfig;
