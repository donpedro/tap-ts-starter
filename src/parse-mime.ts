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
export async function parseItem(mimeEmail: Buffer) {
  let parsed = await sp(mimeEmail) // sp returns a promise; await waits for it, strips the result out and puts that result into the "parsed" variable

  let rec = new tapTypes.streamRecord()
  rec.stream = 'email'
  rec.time_extracted = new Date()
  rec.record = parsed
  return rec
}

