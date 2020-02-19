function multiply(a: number, b: number): number {
    return a * b;
}

function minus(a: number, b: number): number {
    return a - b;
}

function sum(a: number, b: number): number {
    return a + b;
}

function divide(a: number, b: number): number {
    return a / b;
}

function calculate(
    op: (x: number, y: number) => number, // op to be calculated
    a: number, // first number
    b: number  // second number
): number {
    // do some logic here
    // const a1 = a.toFixed(13);

    const result = op(a, b);

    // do some logic here
    // const result1 = result*3;
    return result;
}

//to run 
// ts-node src/tmp/op.ts
console.log(calculate(multiply, 10, 10)); // 100
console.log(multiply(10, 10));


console.log(calculate(divide, 10, 2));   // 5
console.log(divide(10, 2));

//console.log(calculate()