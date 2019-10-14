//console.log(Hello)
//window.print(Hello);
//alert("Hello World!");
// console.log("hello world!");
//let name = prompt("What is your name?");

const program = require('commander');

program
//  .option('-s, --small', 'small pizza size')
  .option('-p, --pizza-type <type>', 'flavour of pizza')
  .option('-s, --pizza-size <type>', 'size of pizza');

//console.log(process.argv);
program.parse(process.argv);

console.log(program.opts());
// if (program.moreInfo) {
//   console.log(program.opts());
// } 


/*const program = require('commander');

program
  .option('-c, --cheese <type>', 'add the specified type of cheese', 'blue');

program.parse(process.argv);

console.log(`cheese: ${program.cheese}`);
*/

/*const program = require('commander');

program
  .option('--no-sauce', 'Remove sauce')
  .option('--cheese <flavour>', 'cheese flavour', 'mozzarella')
  .option('--no-cheese', 'plain with no cheese')
  .parse(process.argv);

const sauceStr = program.sauce ? 'sauce' : 'no sauce';
const cheeseStr = (program.cheese === false) ? 'no cheese' : `${program.cheese} cheese`;
console.log(`You ordered a pizza with ${sauceStr} and ${cheeseStr}`);
*/

/*
const program = require('commander');

program
  .option('-c, --cheese [type]', 'Add cheese with optional type');

program.parse(process.argv);

if (program.cheese === undefined) console.log('no cheese');
else if (program.cheese === true) console.log('add cheese');
else console.log(`add cheese type ${program.cheese}`);
*/



// const program = require('commander');

// function commaSeparatedList(value, dummyPrevious) {
//   return value.split(',');
// }

// program
//   .option('-l, --list <items>', 'comma separated list', commaSeparatedList);

// console.log(process.argv);

// program.parse(process.argv);

// if (program.list !== undefined) console.log(program.list);