import { funcRunner } from '../src/funcRunner';

test('test reverseString', () => {
    function reverseString(str: string): string {
        return str.split("").reverse().join("");
    }

    const result = funcRunner('hello', reverseString);
    expect(result).toEqual('olleh');
});


test('test parseInt', () => {
    const result = funcRunner('12', parseInt);
    expect(result).toEqual(12);
});