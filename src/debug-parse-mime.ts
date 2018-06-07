import * as fse from 'fs-extra'
import * as tapTypes from './tap-types'
import * as parser from './parse-mime'


var args = process.argv.slice(2) // remove unneeded boilerplate args


fse.readFile(args[0])
.then(function(buffer: Buffer) {
    return parser.parseItem(buffer)
})
.then(function(value:any){
    console.log(JSON.stringify(value));
})
.catch(function(error){
    console.log(error);
});

