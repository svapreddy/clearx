import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json';

export default [{
  input: 'src/main.js',
  output: {
    name: 'ClearX',
    file: pkg.browser,
    format: 'umd',
    sourcemap: true,
  },
  plugins: [
    resolve(),
    commonjs()
  ]
}, {
  input: 'src/main.js',
  external: ['deepmerge', 'fast-deep-equal', 'type-fest', '@types/react'],
  output: [
    { file: pkg.main, format: 'cjs', sourcemap: true },
    { file: pkg.module, format: 'es', sourcemap: true }
  ]
}];
