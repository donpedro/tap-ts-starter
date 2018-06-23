/**
 * This module is the entry point for local execution as a Singer target (see the [spec](https://github.com/singer-io/getting-started/blob/master/docs/RUNNING_AND_DEVELOPING.md))
 */

/** this is a dummy single-line comment needed for documentation build; a hack for https://github.com/TypeStrong/typedoc/issues/603 */

/** DummyClass is used in testing (see ```npm test``` in package.json) */
export default class DummyClass {}

import * as configLoader from './singer/tap-load-config'
// import * as parseMime from './parse-mime'
// export { parseItem } from './parse-mime'
const readline = require('readline')
import * as fse from 'fs-extra'

// show developers that code has started to run
console.log('working!')

let readInput = (): Promise<boolean> => {
  return new Promise(function(result, reject) {
    try {
      let rl: any
      let pipeIdx = process.argv.indexOf('<')
      if (pipeIdx >= 0) {
        // the pipe character hasn't been handled for us (likely we are debugging under internalConsole) so we handle it: hook up readline to the file indicated for piping
        rl = readline.createInterface({
          input: fse.createReadStream(process.argv[pipeIdx + 1]),
          crlfDelay: Infinity,
          terminal: false
        })
      }
      // hook up stdin to readline, which will grab it one line at a time.
      else rl = readline.createInterface({ input: process.stdin, terminal: false })
      console.log(
        'Now receiving input. If you did not pipe in any input (e.g. "node src/target-main < inputFile"), press Ctrl-C to break.'
      )

      rl.on('line', function(line: any) {
        console.log('rl.line: ' + line)
      })
      rl.on('close', function() {
        console.log('rl.close')
        result(true)
      })
    } catch (error) {
      console.error(error)
      reject(false)
    }
  })
}

/** mainFunction is the main code to be run.
 *
 * This code is in its own function because it uses "await" to call async functions, and
 * the await keyword can only be used in an async function.
 */
async function mainFunction() {
  try {
    var configObjs = await configLoader.loadConfig()
    //    return scanDir.scanDir(configObjs, parseMime.parseItem)
    if (process.stdin.isTTY) {
      // in Windows we expect input to be piped in, e.g. "node src/target-main < inputFile". isTTY means nothing was piped in
      // isTTY will never be true with launch.json's "console":"internalConsole" (the default for vscode debugging), which doesn't allow input
      console.error('no data piped in; expected something like "node src/target-main < inputFile"')
      process.exit()
    } else {
      await readInput()
    }
  } catch (error) {
    // Handle errors
    console.error('Error: ', error)
  }
}

// call mainFunction if this is the main function (but not if it is just imported by another function)
if (process.argv[1].includes('target-main')) mainFunction()
