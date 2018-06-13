import * as mimeparse from '../src/parse-mime'
import * as tapTypes from '../src/tap-types'
const fse = require('fs-extra')

const inputDir = '../tap-ts-starter/testdata/emails'
const resultDir = '../tap-ts-starter/testdata/testoutput'
const config = './testdata//email.test-config.json'

async function readConfigs(configuration) {
  try {
    const packageObj = await fse.readJson(configuration)

    return packageObj
  } catch (err) {
    console.error(err)
    return {}
  }
}

test('checking mime-parser.', async () => {
  let result = await readConfigs(config)

  expect.assertions(result.length) //says to expect result[0].len tests
  //which is the number of input test files - it should equal the num of expected result files

  for (let i = 0; i < result.length; i++) {
    let testdata = result[i].testdata //iterate through '../tap-ts-starter/testdata/emails'
    let expecteddata = result[i].expectedresult //interate through '../tap-ts-starter/testdata/testoutput'

    console.log('Tested data input: ' + testdata + ' with expected output: ' + expecteddata)

    let data = await fse.readFile(inputDir + '/' + testdata, 'utf8')
    let parsedresult = await mimeparse.parseItem(data)
    let expected = await fse.readJson(resultDir + '/' + expecteddata)

    expected.time_extracted = parsedresult.time_extracted.toISOString()

    await expect(JSON.stringify(parsedresult)).toEqual(JSON.stringify(expected))
  } //end for loop
})
