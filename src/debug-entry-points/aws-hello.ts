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
  resource: '/hello',
  path: '/hello',
  httpMethod: 'POST',
  headers: null,
  queryStringParameters: null,
  pathParameters: null,
  stageVariables: null,
  requestContext: {
    path: '/hello',
    accountId: '540471531016',
    resourceId: 'rl6k0w',
    stage: 'test-invoke-stage',
    requestId: '94c5ef7a-7b50-11e8-ae57-23355f41aba0',
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
    resourcePath: '/hello',
    httpMethod: 'POST',
    extendedRequestId: 'JOgpCFlIPHcF91Q=',
    apiId: 'km898b6ahb'
  },
  body: '{\n "message": "Is anyone there?"\n}',
  isBase64Encoded: false
}

handler.hello(lambdaEvent, {}, callback)
