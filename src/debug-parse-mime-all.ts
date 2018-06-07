import * as fse from 'fs-extra'
import * as tapTypes from './tap-types'
import * as parser from './parse-mime'


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
    