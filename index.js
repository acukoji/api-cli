//console.log(Hello)
//window.print(Hello);
//alert("Hello World!");
// console.log("hello world!");
//let name = prompt("What is your name?");


const program = require('commander');

program
  .option('-d, --debug', 'output extra debugging of our app')
  // .option('-s, --small', 'small pizza size')
  .option('-p, --pizza-type <type>', 'flavour of pizza');

// console.log(process.argv);
program.parse(process.argv);

if (program.debug) {
  console.log(program.opts());
}
// console.log('pizza details:');
// if (program.small) console.log('- small pizza size');

if (program.pizzaType) {
  console.log(`- ${program.pizzaType}`);
}