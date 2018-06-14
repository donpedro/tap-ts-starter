/**
 * This module is the entry point for a local code path that simplistically mocks an AWS trigger call, such as would be received
 * when a Lambda module was called by an S3 trigger; see [here](https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-handler.html)
 */

/** this is a dummy single-line comment needed for documentation build; a hack for https://github.com/TypeStrong/typedoc/issues/603 */

import * as handler from './handler'

function callback(error: any, result: Object) {
  if (error) {
    console.log('ERROR!')
    console.log(JSON.stringify(error))
  } else {
    console.log('OK!')
    console.log(JSON.stringify(result))
  }
}

handler.hello({}, {}, callback)
