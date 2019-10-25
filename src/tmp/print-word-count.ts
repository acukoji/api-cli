function printWordCount(str: string): void {

    var CountAlpha = 0;
    var CountBeta = 0;
    var CountOmega = 0;

    var wordsArray = str.split(' ');
    //console.log(wordsArray);
    var i = 0;
    for (i = 0; i < wordsArray.length; i++) {
        if (wordsArray[i] == 'alpha') {
            CountAlpha = CountAlpha + 1;
        }
        if (wordsArray[i] == 'beta') {
            CountBeta = CountBeta + 1;
        }
        if (wordsArray[i] == 'omega') {
            CountOmega = CountOmega + 1;
        }
    }
    console.log('alpha: ' + CountAlpha);
    console.log('beta: ' + CountBeta);
    console.log('omega: ' + CountOmega);
}
printWordCount('alpha alpha beta beta omega beta')

/*
resources used:
https://stackoverflow.com/questions/52015844/how-to-convert-word-list-to-array-in-javascript
--for creating an array of words using str.split.

https://www.w3schools.com/js/js_loop_for.asp
--reviewed how to set up for loops.

How I wrote the code:
--I knew i needed to contain the str parameter in an array so i could count them based on index position.
--I looked up a way to split the string into an array using .split
--I knew I needed to iterate over the array, so i looked up for loops
--I knew I needed a way to flag/count each instance of each word, so I set up a variable for word-count, and +1'd them with an if statement.
*/