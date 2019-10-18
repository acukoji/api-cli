export function funcRunner(value: string, fn: (n: string) => any): any {
    return fn(value)
}

// // a is funciton that takes string, and returns any
// export function funcRunner2(value, a) {
//     return a(value)
// }


