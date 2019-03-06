import path from 'path'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import buble from 'rollup-plugin-buble'
import replace from 'rollup-plugin-replace'
import serve from 'rollup-plugin-serve'

const distFolder = './example/bundle'
const bundleName = 'todoapp.bundle'

const serverOptions = {
  // Folder to serve files from
  contentBase: './example',
  port: 8719,
  // Return override.html instead of 404
  historyApiFallback: './example/index.html',
  // set headers
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
}

let defaultConfig = [{
  input: 'example/todoApp.js',
  plugins: [
    resolve({
      extensions: ['.js'],
      browser: true
    }),
    // For bundling React
    replace({
      include: 'node_modules/**',
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    commonjs({
      include: 'node_modules/**'
    }),
    buble({
      objectAssign: 'Object.assign'
    }),
    serve(serverOptions)
  ],
  output: [
    {
      sourcemap: true,
      file: path.join(distFolder, `/${bundleName}.js`),
      name: 'todoApp',
      format: 'iife'
    }
  ]
}]

export default commandLineArgs => {
  return defaultConfig
}
