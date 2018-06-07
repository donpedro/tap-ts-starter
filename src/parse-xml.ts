/** parseSting is a xml to json parser from npm 'xml2js' module (https://www.npmjs.com/package/xml2js)
 *
 */
import * as tapTypes from './tap-types'
var parseString = require('xml2js').parseString

export function parseItem(xmlfile: Buffer) {
  return new Promise(function(resolve, reject) {
    parseString(xmlfile, function(err: any, result: any) {
      //console.dir(result);
      if (result != null) {
        let rec = new tapTypes.streamRecord()
        rec.stream = 'xml'
        rec.time_extracted = new Date()
        rec.record = result
        resolve(rec)
      } else {
        reject(Error('It broke'))
      }
    })
  })
} //end function parseItem
