/**
 * This module is the entry point for a local code path that simplistically mocks an AWS trigger call, such as would be received
 * when a Lambda module was called by an S3 trigger; see [here](https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-handler.html)
 */

/** this is a dummy single-line comment needed for documentation build; a hack for https://github.com/TypeStrong/typedoc/issues/603 */

import * as handler from './handler'
const event = './testdata/events/ObjectCreated.Put.json';

function callback(error: any, result: Object) {
  if (error) {
    console.log('ERROR!')
    console.log(JSON.stringify(error))
  } else {
    console.log('OK!')
    console.log(JSON.stringify(result))
  }
}

let args = process.argv.slice(2) // remove unneeded boilerplate args
// pass in the first command line parameter (which should be a file name) in place of AWS' "event" object. handleFileTrigger will
// load that file as its input
//handler.handleFileTrigger(args[0], {}, callback)
var fs = require('fs');
var content = fs.readFileSync(event);
//console.log(content.toString());

let myevent = JSON.parse(content);
//console.log(myevent);
//console.log(JSON.stringify(myevent.Records[0]))
//let myevent = JSON.parse(event);
handler.handleFileTrigger(myevent, {}, callback)
