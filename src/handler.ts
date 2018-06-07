/**
 * The exports in this file can be set as "handlers" (entry points) for AWS Lambda functions;
 * e.g. ```export function hello...``` in handler.js is accessible as "handler.hello".
 *
 * For automated Serverless deployment this is setup is managed in serverless.yml.
 * Search for handler.hello to see how is is done.
 */ /** hack for https://github.com/TypeStrong/typedoc/issues/603 */

import getFile = require('./s3-getfile')
import * as fse from 'fs-extra'
import * as parseMime from './parse-mime'
//import * as hand from './handler';
const hand = require('handler');
// response object for Lambda Proxy integration; see https://serverless.com/framework/docs/providers/aws/events/apigateway/
class lambdaResponse {
  statusCode: number = 200
  headers: object = {
    // TODO: limit to a whitelist of allowed sites
    'Access-Control-Allow-Origin': '*', // Required for CORS support to work
    'Access-Control-Allow-Credentials': true // Required for cookies, authorization headers with HTTPS
  }
  body: string = '' // set response body here
}

export function hello(event: any, context: any, callback: any) {
  const response = new lambdaResponse()
  response.body = JSON.stringify({
    message: 'Hello! Your function executed successfully!',
    input: event
  })

  callback(null, response)

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Hello! Your function executed successfully!', event });
}

export function handleFileTrigger1(event: any, context: any, callback: any) {
  const response = new lambdaResponse()
  let h = new hand(response);

  
}
export function handleFileTrigger(event: any, context: any, callback: any) {
  const response = new lambdaResponse()
  
  function handleFile(contents: any) {
    console.log('File Contents: \n' + contents)
    parseMime.parseItem(contents).then(function(parsedObj: Object) {
      console.log('Parsed Contents: \n' + JSON.stringify(parsedObj))
      response.body = JSON.stringify(parsedObj)
    })
  }

  if (typeof event === 'string') {
    // if event is a string then we are running locally (because on AWS event is always an object) and the string represents a filename
    fse.readFile(event).then(function(buffer: Buffer) {
      handleFile(buffer)
      callback(null, response)
    })
  } else {
    getFile
      .getFilePromise(event.Records[0]) // this grabs only the first record, assuming we'll always only receive one at a time
      .then(function(value: any) {
        handleFile(value)
        return value
      })
      .catch(function(error: any) {
        // Handle any error from all above steps
        console.log('final error: ', error)
        return error
      })
      .then(function(finalResult: any) {
        // final .then replaces .finally
        callback(null, response)
      })
  }
}
