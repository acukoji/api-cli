import { fib } from '../src/fib';

it('test fib(0) returns 0', () => {
    expect(fib(0)).toEqual(0);
});

it('test fib(1) returns 1', () => {
    expect(fib(1)).toEqual(1);
});

it('test fib(2) returns 1', () => {
    expect(fib(2)).toEqual(1);
});

it('test fib(14) returns 377', () => {
    expect(fib(14)).toEqual(377);
});