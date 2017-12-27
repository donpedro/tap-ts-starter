/** Parse MIME files using [Nodemailer.Mailparser](https://nodemailer.com/extras/mailparser/) 
 * 
*/ /** hack for https://github.com/TypeStrong/typedoc/issues/603 */

import * as mailparser from 'mailparser'
//var mp = mailparser.MailParser; // low-level parser
var sp = mailparser.simpleParser // higher-level parser (easier to use, not as efficient)

/** Convert the Mime message into json */
export function parseItem(mimeEmail: Buffer) {
  return sp(mimeEmail).then(function(emailObj) {
    return {
      type: 'RECORD',
      stream: 'email',
      time_extracted: JSON.stringify(new Date()),
      record: emailObj
    }
  })
}
