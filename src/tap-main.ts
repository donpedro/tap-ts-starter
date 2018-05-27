/**
 * This module is the entry point for local execution as a Singer tap (see the [spec](https://github.com/singer-io/getting-started/blob/master/SPEC.md))
 */

/** this is a dummy single-line comment needed for documentation build; a hack for https://github.com/TypeStrong/typedoc/issues/603 */

/** DummyClass is used in testing (see ```npm test``` in package.json) */
export default class DummyClass {}

import * as configLoader from './tap-load-config'
import * as parseMime from './parse-mime'
export { parseItem } from './parse-mime'
import * as scanDir from './scan-dir'

// show developers that code has started to run
console.log('working!')

/** mainFunction is the main code to be run.
 *
 * This code is in its own function because it uses "await" to call async functions, and
 * the await keyword can only be used in an async function.
 */
async function mainFunction() {
  try {
    var configObjs = await configLoader.loadConfig()
    return scanDir.scanDir(configObjs, parseMime.parseItem)
  } catch {
    let error = (error: any): any => {
      // Handle errors
      console.error('Error: ', error)
      return error
    }
  }
}

// call mainFunction
mainFunction()
