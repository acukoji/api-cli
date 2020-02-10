test('promise returns 3 value', () => {
    const promise = Promise.resolve(3);    
    return promise.then(value => expect(value).toEqual(3));
});

test('promise returns a [1, 3] array', () => {
    const promise = Promise.resolve([1, 3]);
    return promise
        .then(value => expect(value).toEqual([1, 3]));
});

test('promise returns "expected error" error', () => {
    const promise = Promise.reject(Error('expected error'));    
    return promise
        .then(value => fail())
        .catch(err => expect(err).toEqual(Error('expected error')));
});

test('handle thrown errors in a Promise', () => {
    const promise = new Promise(() => {
        throw Error('expected error');
    });

    return promise
        .then(value => fail())
        .catch(err => {
            expect(err).toEqual(Error('expected error'))
        });
});
