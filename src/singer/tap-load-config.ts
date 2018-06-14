/**
 * This file handles configuration (command line args and config file loading) for Singer taps (see the [spec](https://github.com/singer-io/getting-started/blob/master/SPEC.md))
 */ /** hack for https://github.com/TypeStrong/typedoc/issues/603 */

// fs-extra is a promise-enabled superset of the standard fs package
import * as fse from 'fs-extra'
import * as tapTypes from './tap-types'

/** return an object containing the contents of config, state and catalog files */
export function loadConfig(): Promise<tapTypes.allConfigs> {
  var args = process.argv.slice(2) // remove unneeded boilerplate args
  if (args[0] != '--config') {
    console.error('arguments: --config CONFIG [--state STATE] [--properties CATALOG]')
    return new Promise(function(resolve, reject) {
      reject("missing required '--config' argument")
    })
  } else {
    return fse.readFile(args[1]).then(function(buffer: Buffer) {
      let config = <tapTypes.ConfigType>JSON.parse(buffer.toString())
      // if (config instanceof configType) {

      // }
      return { config: config }
    })
  }
}
