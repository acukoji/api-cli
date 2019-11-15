type Counter = {
    [key: string]: number;
}

//var counter = new Map<string, number>();
var counter: Counter = {};
var str = 'alpha alpha beta beta omega beta';
var wordsArray = str.split(' ');

// wordsArray.forEach(
//     function (x) {
//         // option1
//         const currValue = counter.get(x);
//         if (currValue == undefined) {
//             counter.set(x, 1);
//         } else {
//             counter.set(x, currValue + 1);
//         }

//         // option2
//         if (counter.get(x) == undefined) {
//             counter.set(x, 1);
//         } else {
//             // broken
//             // counter.set(x, counter.get(x) + 1);
//         }

//         // option3
//         if (counter.get(x) == undefined) {
//             counter.set(x, 1);
//         } else {
//             var value = counter.get(x);
//             if (value != undefined) {
//                 counter.set(x, value + 1);
//             }
//         }
//     }
// )
// console.log(counter);

wordsArray.forEach(
    function (x) {
        if (counter[x] == undefined) {
            counter[x] = 1;
        } else {
            counter[x] = counter[x] + 1;
        }
    }
)
console.log(counter);


//Older "long" version of the code:
/*
function printWordCount(str: string): void {

    var wordsArray = str.split(' ');
    var sortedArray = wordsArray.sort();
    // sort function makes it possible for for-loop to count repeated words, because all repeats are grouped together, and we structure the for-loop to include an if-statement that notices when current iteration (wordsArray[i]) is different than what came before (wordSeen).
    var wordSeen = null;
    var wordCount = 0;
    // initializing wordSeen/count to null/zero keeps the first iteration from being counted and printed out.  The requirements of the if-statements below allow for the first instance to 'pass through'.
    for (var i = 0; i < wordsArray.length; i++) {
        if (wordsArray[i] != wordSeen) {
            //sets condition to print out wordSeen with its count, only once the for-loop iterates to a word that's new.
            if (wordCount > 0) {  //important bc wordSeen only becomes defined after the first pass; it starts out null, but is assigned array[i] below--when wordCount also become greater than 0.  Alternatively, if(wordSeen != null) would also work here.
                console.log(wordSeen + ": " + wordCount);
            }
            wordSeen = wordsArray[i];
            wordCount = 1;
        }
        else {   //wordCount increases each time wordsArray != wordSeen
            wordCount++;
        }
    }
    //not sure why next line was in the example i modeled from. Seems unnecessary?  It works even in current commented out form.
    //   if (wordCount > 0){
    console.log(wordSeen + ": " + wordCount);
    //   }
}
printWordCount('alpha alpha beta beta omega beta')
printWordCount('1 22 22 1 3')

*/

/*
resources used:
https://stackoverflow.com/questions/52015844/how-to-convert-wordSeen-list-to-array-in-javascript
--for creating an array of words using str.split.

https://www.w3schools.com/js/js_loop_for.asp
--reviewed how to set up for loops.

How I wrote the code:
--I knew i needed to contain the str parameter in an array so i could count them based on index position.
--I looked up a way to split the string into an array using .split
--I knew I needed to iterate over the array, so i looked up for loops
--I knew I needed a way to flag/count each instance of each wordSeen, so I set up a variable for wordSeen-count, and +1'd them with an if statement.
*/

/* V2 resources used:
https://stackoverflow.com/questions/34615493/count-duplicates-in-an-array

V2 How I wrote the code:
--I brainstormed what code was needed to track any new string which appeared.
--I kept the initial code of .split, and added .sort.
--I really wanted to figure it out on my own, but in googling for answers on how to figure out how to keep track of new words from an array, it was pretty much unavoidable to find the solution .
--I attempted to understand what was going on in the "long way" code, and recreate it here instead of just copypasta from above link.
--I added comments so that I could understand what was happening at each step, and also played with altering parts of the code to see if it would break, and to understand better what each line was doing.
*/

