//how to use a promise right here, just how parse.mime is used
//
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
