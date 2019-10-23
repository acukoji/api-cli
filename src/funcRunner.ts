export function funcRunner(value: string, fn: (n: string) => any): any {
    return fn(value)
}
