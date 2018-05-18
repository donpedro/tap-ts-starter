/** Parse MIME files using [Nodemailer.Mailparser](https://nodemailer.com/extras/mailparser/)
 *
 */ /** hack for https://github.com/TypeStrong/typedoc/issues/603 */

/* 
Updated mailparser to 2.2.0 to avoid malicious getcookies module; see https://blog.npmjs.org/post/173526807575/reported-malicious-module-getcookies
Consider mailparse (https://github.com/javascriptlove/mailparse) for the future, since mailparser will no longer be maintained. Mailparse does not yet have any TypeScript types available.
*/
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
