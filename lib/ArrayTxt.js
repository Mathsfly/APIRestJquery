"use strict"

var fs = require('fs');
 
//export default class ES6 babel isn't integrated
module.exports = class ArrayTxt {
    
    ArrayToTxt(link, Arr) {
        var file = fs.createWriteStream(link);
        //the exception:
        file.on('error', function(err) { 
            console.log('ERROR write file');
        });
        //May be condition doesn't necessary, but let see.
        if (fs.existsSync(link)) {
            Arr.forEach(function(v) { 
                file.write(v + '\n'); 
            });
        };
        file.end();
        console.log('Added to Txt');
    };

    TxtToArray(link) {
        var Arr = [];
        console.log('TxtToArr');
        var remaining = ''; 
        var file = fs.createReadStream(link);
        file.on('data', function(data) {
            //the procedure is asynchronised. So maybe it pass multiple time.
            //EX: A B C D E
            // A -> While
            // B C D E -> While
            remaining += data;
            let index = data.indexOf('\n');
            while (index > -1) {
                //get first line from remaining, remove it in remaining.
                var line = remaining.substring(0, index);
                remaining = remaining.substring(index + 1);
                // It's always correct only line.
                Arr.push(line);
                index = remaining.indexOf('\n');
            }
        });

        file.on('end', function() {
            console.log('finish read file');

        });
        console.log('Result: ' + Arr);
        return Arr;
    };
}