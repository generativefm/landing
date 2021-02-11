import babel from '@rollup/plugin-babel';

const pageConfig = (input) => ({
  input,
  output: {
    dir: 'dist',
    format: 'cjs',
    exports: 'default',
  },
  plugins: [babel({ babelHelpers: 'bundled' })],
  external: [/react/],
});

export default ['./src/index.jsx', './src/about.jsx'].map(pageConfig);
