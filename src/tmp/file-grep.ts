//var fs = require('fs');
import fs from 'fs';

//example 1: asynchornous (non-blocking)
/*
var fs = require('fs');
 
fs.readFile('DATA', 'utf8', function(err, contents) {
    console.log(contents);
});
 
console.log('after calling readFile');
*/

// 'DATA' is the name of the file.
// 'function' is where we code:
//1:  to read the file's contents and search for our "search string" parameter.  Where should this parameter be located?
//should this DATA be from any file, or should it be acquired using "get" method? 
//2: print out each line that contains our "search string".
//parse contents into an array of single lines.
//for array, if line contains "str", print line.


// TODO (acukoji) update var to const, if possible
// TODO (acukoji) add types to all variables, if possible

// TODO (acukoji) update this solution to use commander to parse/validate CLI paramaters
//                see commander github page

// TODO (acukoji) move file-grep.ts and print-webpage-links to api-cli/src/tmp project directory

var fileName: string = process.argv[3];
var searchWord = process.argv[2]

fs.readFile(fileName, 'utf8', function (err: any, contents: string) {
    if(err) console.error(err);
    
    var contentsArray: string[] = contents.split("\n");
   
    // TODO (acukoji) attempt to see if there is a more consise way of writing this
    var newContentsArray: string[] = contentsArray.filter(function (element: any) {
        return element.includes(searchWord);
    });

    // TODO (acukoji) print "search word not found" if search word had not hits

    // for(var i : number = 0; i < newContentsArray.length; i++){
    //     console.log(newContentsArray[i]);
    // }
    //console.log(newContentsArray);
    newContentsArray
        .forEach(x => console.log(x));
})

/*
Thought process:
1.  Needed to understand that we are making our own simple version of Grep using Typescript, and not a wrapper for Grep as I first mistakenly understood the assignment.  Looking at the invocation command made me realize this.
2. I didn't understand how to 'scan' terminal input from the invocation command to use in my source code.
3. Decided to make a hard coded version first.
4. pseudo-coded the logic using for-loop, but considered built-in functions like .map and .filter
5. googled fs.readFile to figure out debugging (err: any, contents: any)--needed to add "any" type to make it work.
6. printed out contentsArray to make sure it worked.
7. Got .filter to work
8. Reasearched how to parse command line arguments.
9. Replaced hard-coded lines with argv elements.
10. improved readability by assigning vars for argv elements.

/* sources:

https://code-maven.com/reading-a-file-with-nodejs

https://stackoverflow.com/questions/5424488/how-to-search-for-a-string-inside-an-array-of-strings

using lambda expression:
var strs = ['abc', 'def', 'ghi', 'jkl', 'mno'];
var value = 'abc';
strs.find((str) => str === value);
https://www.freecodecamp.org/forum/t/the-difference-between-map-and-filter/277659
https://alligator.io/js/filter-array-method/
https://flaviocopes.com/how-to-string-contains-substring-javascript/
https://nodejs.org/en/knowledge/command-line/how-to-parse-command-line-arguments/
*/


