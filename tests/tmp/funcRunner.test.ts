import { funcRunner } from '../../src/tmp/funcRunner';

test('test funcRunner calling reverseString', () => {
    function reverseString(str: string): string {
        return str.split("").reverse().join("");
    }

    const result = funcRunner('hello', reverseString);
    expect(result).toEqual('olleh');
});

test('test funcRunner calling parseInt', () => {
    const result = funcRunner('12', parseInt);
    expect(result).toEqual(12);
});

test('test funcRuner calling repeat3x', () => {
    function repeat3x(str: string): string {
        return str + str + str;
    }

    const result = funcRunner('print', repeat3x);
    expect(result).toEqual('printprintprint');
});

test('test funcRuner calling anonymousFunc repeat3x', () => {
    const result = funcRunner(
        'print',
        (str: string): string => str + str + str
    );
    expect(result).toEqual('printprintprint');
});