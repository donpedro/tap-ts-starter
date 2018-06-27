import { parseItem } from '../src/tap-main'
import fse from 'fs-extra'

const inputDir = 'testdata/tests'
const resultDir = 'testdata/expectedResults'
const config = 'test/testdata-config.json'

async function readConfigs(configuration) {
  try {
    const packageObj = await fse.readJson(configuration)
    return packageObj
  } catch (err) {
    console.error(err)
    return {}
  }
}

test('checking parseItem.', async () => {
  let result = await readConfigs(config)

  expect.assertions(result.length) //says to expect result[0].len tests
  //which is the number of input test files - it should equal the num of expected result files

  // wait for ts-jest 23.x--data-driven tests using "each": https://github.com/sapegin/jest-cheat-sheet/blob/master/Readme.md#data-driven-tests-jest-23
  // instead of for loop on test-config, use fse.readdir to grab files and then test with test.each
  //test.each(filelist)('Tested data input: ' + result[i].testdata + ' with expected output: ' + result[i].expecteddata, async () => {

  for (let i = 0; i < result.length; i++) {
    let testdata = result[i].testdata //iterate through '../tap-ts-starter/testdata/emails'
    let expecteddata = result[i].expectedresult //interate through '../tap-ts-starter/testdata/testoutput'

    console.log('Tested data input: ' + testdata + ' with expected output: ' + expecteddata)

    let data = await fse.readFile(inputDir + '/' + testdata)
    let parsedresult = await parseItem(data)
    let expected = await fse.readJson(resultDir + '/' + expecteddata)

    expected.time_extracted = parsedresult.time_extracted.toISOString()

    await expect(JSON.stringify(parsedresult)).toEqual(JSON.stringify(expected))
  } //end for loop
})
