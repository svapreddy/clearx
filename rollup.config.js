import path from 'path'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import buble from 'rollup-plugin-buble'
import license from 'rollup-plugin-license'
import filesize from 'rollup-plugin-filesize'
import standard from 'rollup-plugin-standard'
import { terser } from 'rollup-plugin-terser'

const packageJSON = require('./package.json')

const config = {
  name: packageJSON.name
}

const distFolder = 'dist'
const bundleName = config.name
const globalVariableName = 'ClearX'

const defaultConfig = [{
  input: 'src/clearx.js',
  plugins: [
    standard(),
    resolve({
      extensions: ['.js'],
      browser: true
    }),
    commonjs({
      include: 'node_modules/**'
    }),
    buble({
      objectAssign: 'Object.assign'
    }),
    license({
      sourcemap: true,
      cwd: '.',
      banner: {
        content: {
          file: path.join(__dirname, 'build.inputs/LICENSE.txt')
        },
        data () {
          return config
        }
      }
    }),
    terser({
      output: {
        comments: function (node, comment) {
          if (comment.type === 'comment2') {
            // multiline comment
            return /@preserve|@license|@cc_on/i.test(comment.value)
          }
          return false
        }
      }
    }),
    filesize()
  ],
  output: [
    {
      sourcemap: true,
      file: path.join(distFolder, `/${bundleName}.js`),
      name: globalVariableName,
      format: 'umd'
    }
  ],
  watch: {
    chokidar: true
    // clearScreen: true,
    // include: 'src/**'
  }
}]

export default commandLineArgs => {
  return defaultConfig
}
