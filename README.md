# tap-ts-starter #

This is a [Singer](https://singer.io) tap built with TypeScript/javascript that runs in Node and produces JSON-formatted data following the [Singer spec](https://github.com/singer-io/getting-started/blob/master/docs/SPEC.md#singer-specification), and most of the spec is reflected in [tap-types.ts](./src/tap-types.ts).

This tap:
- Scans a local folder, treating the files it finds there as emails (MIME), parsing them into JSON with [Nodemailer.Mailparser](https://nodemailer.com/extras/mailparser/)
- Outputs a schema along with the resulting json for each file

This tap is also meant as a template to be forked for other uses. It separates the scanning of a resource collection (e.g. a folder) and the parsing of the individual resources (e.g. MIME files) into separate modules for easy drop-in replacement. A scanner module is included (scan-dir.ts for scanning local folders) and a parser module (parse-mime.ts for parsing emails) is included as well.

This code path is documented [here](https://rawgit.com/donpedro/tap-ts-starter/master/dist/docs-tap/index.html).

### New-School Code
If you're used to JavaScript code, here are a few newer ES6/ES7/TypeScript code features we use that might be new to you:
* [Arrow functions](https://www.sitepoint.com/es6-arrow-functions-new-fat-concise-syntax-javascript/) are largely interchangable
 with the more familiar ```function``` syntax:
 
 ```let aFunction = () => {...```
 
 is roughly equal to
 
 ```function aFunction() {...```
* [Promises](https://scotch.io/tutorials/javascript-promises-for-dummies) replace callbacks to clean up and clarify our code
* [Async/await](https://hackernoon.com/6-reasons-why-javascripts-async-await-blows-promises-away-tutorial-c7ec10518dd9) builds on promises to make asynchronous code almost as simple (in many cases) as synchronous.

### AWS Lambda Deployment
In addition to running as Singer taps, parsers can also be deployed as AWS Lambda functions. This allows you to take the exact same parser that your tap uses and deploy it to parse files one-at-at-time via triggers which run as they are dropped into a bucket. This functionality is enabled out of the box; the deploy script will create the bucket, deploy the parser as a Lambda function and add a trigger to call it when files are created in the bucket.

This code path is documented [here](https://rawgit.com/donpedro/tap-ts-starter/master/dist/docs-aws/index.html).

### Quick Start
* Dependencies: 
    * [git](https://git-scm.com/downloads)
    * [nodejs](https://nodejs.org/en/download/releases/) - At least v6.3 (6.9 for Windows) required for TypeScript debugging
    * npm (installs with Node)
    * typescript - installed as a development dependency
    * serverless - `npm install -g serverless` to install globally
* Clone: `git clone https://github.com/donpedro/tap-ts-starter.git`
    * After cloning the repo, be sure to run `npm install` to install npm packages
* Debug: with [VScode](https://code.visualstudio.com/download) use `Open Folder` to open the project folder, then hit F5 to debug. This runs without compiling to javascript using [ts-node](https://www.npmjs.com/package/ts-node)
* Test: `npm test` or `npm t`
* Compile documentation: `npm run build-docs-tap` and `npm run build-docs-aws`
* Compile to javascript: `npm run build`
* Deploy: `serverless deploy --aws-profile [profilename]`
    * depends on [aws-cli](http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html) [named profiles](http://docs.aws.amazon.com/cli/latest/userguide/cli-multiple-profiles.html)
* More options are included from [TypeScript Library Starter](https://github.com/alexjoverm/typescript-library-starter.git) and are documented [here](starter-README.md)
* Run using included test data (be sure to build first): `node dist/tap-main.cjs.js --config testdata/emails.tap-config.json`

### Notes
Note: This document is written in [Markdown](https://daringfireball.net/projects/markdown/). We like to use [Typora](https://typora.io/) and [Markdown Preview Plus](https://chrome.google.com/webstore/detail/markdown-preview-plus/febilkbfcbhebfnokafefeacimjdckgl?hl=en-US) for our Markdown work.