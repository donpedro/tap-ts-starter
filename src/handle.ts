/*

import getFile = require('./s3-getfile')
import * as fse from 'fs-extra'
import * as parseMime from './parse-mime'

class handle{
    
    response: {
        statusCode: number = 200
        headers: object = {
          // TODO: limit to a whitelist of allowed sites
          'Access-Control-Allow-Origin': '*', // Required for CORS support to work
          'Access-Control-Allow-Credentials': true // Required for cookies, authorization headers with HTTPS
        }
        body: string = '' // set response body here};
    }
    constructor(response:any){
        this.response = response;
    }

  //business logic
  handleFile(contents: any) {
    console.log('File Contents: \n' + JSON.stringify(contents))
    parseMime.parseItem(contents).then(function(this:any,parsedObj: Object) {
      console.log('Parsed Contents: \n' + JSON.stringify(parsedObj))
      this.response.body = JSON.stringify(parsedObj)
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

module.exports = handle;
*/