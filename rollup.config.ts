import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import sourceMaps from 'rollup-plugin-sourcemaps'
import camelCase from 'lodash.camelcase'

import json from 'rollup-plugin-json'; 

const pkg = require('./package.json')

const libraryName = 'tap-main'

export default {
  input: `dist/js/${libraryName}.js`,
  output: [
//    { file: pkg.main, name: camelCase(libraryName), format: 'umd' },
	{ file: pkg.main, name: camelCase(libraryName), format: 'cjs' }, // we're targeting node (not browser) so our commonjs modules are fine
    { file: pkg.module, format: 'es' },
  ],
  sourcemap: true,
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external: [
    'htmlparser2' // include externally to bypass "TypeError: Cannot read property 'DomHandler' of undefined" bug: https://github.com/fb55/htmlparser2/issues/223
  ],
  watch: {
    include: 'dist/js/**',
  },
  plugins: [
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs(),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    resolve({
      preferBuiltins: true, // squelching warnings
    }
    ),
    json({}),
    // Resolve source maps to the original source
    sourceMaps(),
  ],
}
