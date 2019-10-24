const aScientificNumber: number = 10e3
const aInt: number = 12
const aDecimal: number = 12.343


const numberString: string = '12.343'
const singleQuoteString: string = '12.343'
const doublQuoteString: string = "12.343"
const tildaQuoteString: string = `12.343`

const True = true
const False = false

// empty/no value
let valueNull = null; valueNull = 33; valueNull = { 'a': 1 };
// unassigned value
const valueUndefined = undefined

class Car {
    numOfDoors: number
    model: string

    constructor(model: string, numOfDoors: number) {
        this.model = model;
        this.numOfDoors = numOfDoors;
    }
}
const aCar = new Car('Camaro', 4);
const modelName = aCar.model;

let foo = null;
// some code that assign foo a value
if (typeof (foo) == 'boolean') {
    // handle as boolean
} else if (typeof (foo) == 'object') {
    // handle as some object
}

// call 
paramaterlessFunction()
function paramaterlessFunction() {
    console.log('run this code');
}
// call there
paramaterlessFunction()

const paramaterlessFunction1 = function () {
    console.log('run this code');
}

// which is equivilant to paramaterlessFunction
// though we must define paramaterlessFunctionConst before calling it
const paramaterlessFunctionConst = () => {
    console.log('run this code');
}
// call
paramaterlessFunctionConst()

// create a function; 
// 2 numbers as params
// returns the multiplication of both numbers

const twoParamFunction = (a: number, b: number): number => a * b

function twoParamFunction2(a: number, b: number): number {
    return a * b;
}


interface Transformer {
    value: string;
    fn: (s: string) => string;
}

function stringTransformerInterface(transformer: Transformer) {
    // complex logic
    return transformer.fn(transformer.value);
}

function stringTransformer(value: string, fn: (s: string) => string) {
    // complex logic
    return fn(value);     // return transformUppercase('hello_world')
}
// function transformUppercase(value: string): string {
//      return value.toUpperCase();
// }
// stringTransformer('hello_world', transformUppercase)
// // HELLO_WORLD
// stringTransformer('hello_world', (s) => s.toUpperCase())
// // HELLO_WORLD



// int a =10
// int b =9
// function(a, b)

var a = 1
var b = 2

if(a == 10){   
}
