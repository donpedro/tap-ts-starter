/**
 * A "scanner" scans a resource collection, parsing the items it finds using the parser passed in
 * (see the [spec](https://github.com/singer-io/getting-started/blob/master/docs/SPEC.md#singer-specification))
 *
 * In this case, we are scanning a directory and parsing the files inside.
 */ /** this is a dummy single-line comment needed for documentation build; a hack for https://github.com/TypeStrong/typedoc/issues/603 */

/** fs-extra is a promise-enabled superset of the standard fs package */
import * as fse from 'fs-extra'
import * as tapTypes from './tap-types'

/** generate json-schemas for our records, if needed */
var generateSchema = require('generate-schema') // typescript types aren't available so we load javascript-style instead of using typescript's import

/**
 * Scan a folder, running parser on each file it finds
 * - TODO: implement configObjs.state and configObjs.catalog, which are just stubs for now
 * - TODO: use interfaces instead of "any" here
 * @param configObjs
 * @param parser
 */
export async function scanDir(configObjs: tapTypes.allConfigs, parser: any) {
  let config = configObjs.config
  // future config options
  // let state = configObjs.state
  // let catalog = configObjs.catalog

  // TODO: allow schema(s) to be passed in in config
  let schema: any = null

  let filelist: string[] = await fse.readdir(config.target_folder as string)
  let parsedObjs = await Promise.all(
    // return an array of promises, one per filename, for Promise.all to run asynchronously
    filelist.map(async function(filename, idx) {
      let buffer = await fse.readFile(config.target_folder + '/' + filelist[idx])
      return parser(buffer) // the parsing is done here
    })
  )
  let parsing = (parsedObjs: any) => {
    if (parsedObjs.length == 0) return null

    let schm = new tapTypes.streamSchema()

    // if no schema exists, create a schema based on the first new object
    if (!schm.schema) schm.schema = generateSchema.json(parsedObjs[0].record)
    schm.stream = parsedObjs[0].stream

    // write the schema
    //console.log(JSON.stringify(schm))

    // write the objects
    parsedObjs.forEach(function(parsedObj: any, idx: any) {
      console.log(JSON.stringify(parsedObj))
    })
    // TODO: write STATE record
  }
  return parsing(parsedObjs)
}
