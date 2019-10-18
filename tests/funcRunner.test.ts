import { funcRunner } from '../src/funcRunner';

it('test reverseString', () => {
    function reverseString(str: string): string {
        return str.split("").reverse().join("");
    }

    const result = funcRunner('hello', reverseString);
    expect(result).toEqual('olleh');
});


it('test parseInt', () => {
    const result = funcRunner('12', parseInt);
    expect(result).toEqual(12);
});