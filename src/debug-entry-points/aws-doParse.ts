/**
 * This module is the entry point for a local code path that mocks an HTTP POST call to AWS Lambda via API Gateway;
 * see [here](https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-handler.html)
 */

/** this is a dummy single-line comment needed for documentation build; a hack for https://github.com/TypeStrong/typedoc/issues/603 */

import * as handler from '../aws/handler'

function callback(error: any, result: Object) {
  if (error) {
    console.log('ERROR!')
    console.log(JSON.stringify(error))
  } else {
    console.log('OK!')
    console.log(JSON.stringify(result))
  }
}

/**
 * lambdaEvent is from a Lambda POST call; body is the "request body", or payload, of the POST call--sent by the caller
 */
let lambdaEvent = {
  resource: '/doParse',
  path: '/doParse',
  httpMethod: 'POST',
  headers: null,
  queryStringParameters: null,
  pathParameters: null,
  stageVariables: null,
  requestContext: {
    path: '/doParse',
    accountId: '540471531016',
    resourceId: 'rl6k0w',
    stage: 'test-invoke-stage',
    requestId: '7535ec60-7b48-11e8-8b23-6d7699f2ee0b',
    identity: {
      cognitoIdentityPoolId: null,
      cognitoIdentityId: null,
      apiKey: 'test-invoke-api-key',
      cognitoAuthenticationType: null,
      userArn: 'arn:aws:iam::540471531016:root',
      apiKeyId: 'test-invoke-api-key-id',
      userAgent: 'aws-internal/3',
      accountId: '540471531016',
      caller: '540471531016',
      sourceIp: 'test-invoke-source-ip',
      accessKey: 'ASIAIXWF7LBAGGMZ64SA',
      cognitoAuthenticationProvider: null,
      user: '540471531016'
    },
    resourcePath: '/doParse',
    httpMethod: 'POST',
    extendedRequestId: 'JOYH5F9PvHcF3RA=',
    apiId: 'km898b6ahb'
  },
  body:
    '{\n "toParse": "Mime-Version: 1.0 (Apple Message framework v730)\\r\\nContent-Type: multipart/mixed; boundary=Apple-Mail-13-196941151\\r\\nMessage-Id: <9169D984-4E0B-45EF-82D4-8F5E53AD7012@example.com>\\r\\nFrom: foo@example.com\\r\\nSubject: testing\\r\\nDate: Mon, 6 Jun 2005 22:21:22 +0200\\r\\nTo: blah@example.com\\r\\n\\r\\n\\r\\n--Apple-Mail-13-196941151\\r\\nContent-Transfer-Encoding: quoted-printable\\r\\nContent-Type: text/plain;\\r\\n\\tcharset=ISO-8859-1;\\r\\n\\tdelsp=yes;\\r\\n\\tformat=flowed\\r\\n\\r\\nThis is the first part.\\r\\n\\r\\n--Apple-Mail-13-196941151\\r\\nContent-Type: text/plain; name=This is a test.txt\\r\\nContent-Transfer-Encoding: 7bit\\r\\nContent-Disposition: attachment;\\r\\n\\tfilename=This is a test.txt\\r\\n\\r\\nHi there.\\r\\n\\r\\n--Apple-Mail-13-196941151--",\n "config": "{\\r\\n    \\"start_date\\" : \\"2017-01-01T00:00:00Z\\",\\r\\n    \\"user_agent\\" : \\"Stitch (+support@stitchdata.com)\\"\\r\\n  }"\n}',
  isBase64Encoded: false
}

handler.doParse(lambdaEvent, {}, callback)
