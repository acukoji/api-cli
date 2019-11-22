//var fs = require('fs');
import fs from 'fs';
//const program = require('commander');
import program from 'commander';

// TODO (acukoji) If a field is not filled in, come up a way to deal with it.
program
    .requiredOption('-f, --fileName <value>', 'data text to search in')
    .requiredOption('-s, --searchWord <value>', 'search term for grep');

program.parse(process.argv);


/*
if(program.searchWord==undefined){
    console.log("Please enter search word.")
    process.exit(-1);
}
if(program.fileName==undefined){
    console.log("Please enter file name.")
    process.exit(-2);
}
*/

console.log(`fileName: ${program.fileName}`);
console.log(`searchWord: ${program.searchWord}`);

// TODO (acukoji) update var to const, if possible           *done
// TODO (acukoji) add types to all variables, if possible    *done

/* TODO (acukoji) update this solution to use commander to parse/validate CLI 
paramaters: use input tags to accept file name and wordsearch parameters. 
see commander github page.  ** to help account for user input error such as 
missing searchterm or data file.
*/

const fileName: string = program.fileName;
const searchWord: string = program.searchWord;

fs.readFile(fileName, 'utf8', function (err: any, contents: string) {
    if (err) console.error(err);

    const contentsArray: string[] = contents.split("\n");

    // TODO (acukoji) attempt to see if there is a more consise way of writing 
    // this newContentsArray "arrow functions"

    const newContentsArray: string[] =
        contentsArray.filter((element: string) =>
            element.includes(searchWord)
        );

    if (newContentsArray.length == 0){
        console.log("Search word not found.")
    }
    /*    const newContentsArray: string[] =
            contentsArray.filter (element: string) =>
                return element.includes(searchWord);
            );
    */


    // TODO (acukoji) print "search word not found" if search word had no hits
    // below code will print not-found message after each line checked in array

    /*
    if(element.includes(searchWord)==false){
    console.log("search word not found");
*/

    // for(var i : number = 0; i < newContentsArray.length; i++){
    //     console.log(newContentsArray[i]);
    // }
    //console.log(newContentsArray);
    newContentsArray
        .forEach((x: string) => console.log(x));

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


