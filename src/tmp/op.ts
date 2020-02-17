function multipy(a: number, b: number): number {
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

function calculate(op: (x: number, y: number) => number, a: number, b: number): number {
    return op(a, b);
}

//to run 
// ts-node src/tmp/op.ts

console.log(calculate(multipy, 10, 10)); // 100
console.log(calculate(divide, 10, 2));   // 5