/** Parse MIME files using [Nodemailer.Mailparser](https://nodemailer.com/extras/mailparser/) 
 * 
*/ /** hack for https://github.com/TypeStrong/typedoc/issues/603 */

import * as mailparser from 'mailparser'
//var mp = mailparser.MailParser; // low-level parser
var sp = mailparser.simpleParser // higher-level parser (easier to use, not as efficient)

import * as tapTypes from './tap-types'

/** Convert the Mime message into json */
export function parseItem(mimeEmail: Buffer) {
  return sp(mimeEmail).then(function(emailObj) {
    let rec = new tapTypes.streamRecord()
    rec.stream = 'email'
    rec.time_extracted = new Date()
    rec.record = emailObj
    return rec
  })
}
