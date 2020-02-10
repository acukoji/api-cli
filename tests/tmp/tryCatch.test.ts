function normalCode(): boolean {
    const foo = 2
    const bar = 'test'
    return true;
}

function exceptionalCode(): boolean {
    const foo = 2
    const bar = 'test'
    throw Error('exceptional');
    return true;
}

function returnError(): Array<any> {
    const foo = 2
    const error = Error('error');
    const bar = 'test'
    return [false, error];
}

test('try catch normalCode', () => {
    try {
        expect(normalCode()).toEqual(true);
    } catch (err) {
        fail('got unexpected error: ' + err)
    }
});

test('try catch exceptionalCode', () => {
    try {
        exceptionalCode();
        fail('test should not get here');
    } catch (err) {
        expect(err).toEqual(Error('exceptional'));
    }
});

test('try catch returnError', () => {
    try {
        expect(returnError()).toEqual([false, Error('error')]);
    } catch (err) {
        fail('should not get here');   
    }
});