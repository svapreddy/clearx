import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json';
import minify from 'rollup-plugin-babel-minify';

export default [{
  input: 'src/clearx.js',
  output: {
    name: 'ClearX',
    file: pkg.browser,
    format: 'umd',
    sourcemap: true,
  },
  plugins: [
    resolve(),
    commonjs(),
    minify()
  ]
}, {
  input: 'src/clearx.js',
  external: ['deepmerge', 'fast-deep-equal', 'type-fest', '@types/react'],
  output: [
    { file: pkg.main, format: 'cjs', sourcemap: true, plugins: [minify()] },
    { file: pkg.module, format: 'es', sourcemap: true, plugins: [minify()] }
  ]
}];
