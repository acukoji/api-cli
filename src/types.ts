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
export function paramaterlessFunction() {
    return null;
}

const paramaterlessFunction1 = function () {
    return null;
}

// which is equivilant to paramaterlessFunction
// though we must define paramaterlessFunctionConst before calling it
export const paramaterlessFunctionConst = () => null;
// call
paramaterlessFunctionConst()