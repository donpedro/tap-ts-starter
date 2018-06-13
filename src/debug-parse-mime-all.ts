import * as fse from 'fs-extra'
import * as tapTypes from './tap-types'
import * as parser from './parse-mime'
const event = './testdata//email.test-config.json'

async function example() {
  try {
    const packageObj = await fse.readJson(event)
    let config = packageObj[0]
    console.log(config)
    console.log(config.testdata)
    console.log(config.expectedresult)
  } catch (err) {
    console.error(err)
  }
}

example()
/*
let inputDir = '../tap-ts-starter/testdata/emails';
let resultDir = '../tap-ts-starter/testdata/testoutput';
async function scandir(file:any, ofile:any){

    let filelist : string[] = await fse.readdir(file as string);
    let outfile : string[] = await fse.readdir(ofile as string);
        return [filelist,outfile];
    }

    let infiles = scandir(inputDir, resultDir);
    console.log(infiles);
    scandir(inputDir,resultDir)
    .then(function(result){
        console.log(result[0][0]);
        console.log(result[1][0]);
        console.log(result[0].length);
       
        
    
    })
    */
/*
var args = process.argv.slice(2) // remove unneeded boilerplate args
let target_folder = args[0];

fse.readdir(target_folder)
    .then(function(filelist){
        return Promise.all(
            // return an array of promises, one per filename, for Promise.all to run asynchronously
            filelist.map(function(filename, idx) {
              return fse.readFile(target_folder + '/' + filelist[idx]).then(function(buffer) {
                // the parsing is done here
                //return parser(buffer.toString('utf8'))
                return parser.parseItem(buffer)
              })
            })
          )
    })
    .then(function(parsedObjs){
        console.log(parsedObjs.length);
        //console.log(JSON.stringify(parsedObjs));
        for(let i of parsedObjs){
            console.log("Here:" + JSON.stringify(i) + "\n");
        }
    })
*/

//below is the previous version of parse-mime.test.ts
/*
let inputDir = '../tap-ts-starter/testdata/emails';
let resultDir = '../tap-ts-starter/testdata/testoutput';


test('checking mime-parser. Test input: '+ inputDir +'\t Expected output: ' + resultDir, async () =>{
    
    let result = await scandir(inputDir,resultDir);

    expect.assertions(result[0].length); //says to expect result[0].len tests
    //which is the number of input test files - it should equal the num of expected result files

    for(let i = 0; i< result[0].length; i++){

        let testdata = result[0][i]; //iterate through '../tap-ts-starter/testdata/emails'
        let expecteddata = result[1][i]; //interate through '../tap-ts-starter/testdata/testoutput'
    
        console.log('Tested data input: '+ testdata+' with expected output: '+expecteddata);
        
        
        let data = await fse.readFile(inputDir +'/'+ testdata,'utf8')
        let parsedresult = await mimeparse.parseItem(data)
        let expected = await fse.readJson(resultDir +'/'+ expecteddata);
        
        expected.time_extracted = parsedresult.time_extracted.toISOString();
        
        await expect(JSON.stringify(parsedresult)).toEqual(JSON.stringify(expected))
        
    }//end for loop

}) 

async function scandir(file:any, ofile:any){
    console.log("inside describe");
    let filelist : string[] = await fse.readdir(file as string);
    let outfile : string[] = await fse.readdir(ofile as string);
        return [filelist,outfile];
}

*/
