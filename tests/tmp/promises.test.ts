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


const oddsFail = (n: number): Promise<string> => {
    return new Promise((resolve, reject) => {
        if (n % 2 == 0) {
            resolve('success')
        } else {
            reject(Error('fail'))
        }
    })
}

test('create a promise that succeeds for a given even number', () => {
    return oddsFail(10)
        .then(value => expect(value).toEqual('success'))
        .catch(err => fail());
});

test('create a promise that fails for a given odd number', () => {
    return oddsFail(11)
        .then(value => fail())
        .catch(err => expect(err).toEqual(Error('fail')));
});

test('call oddsFail using Promise.all', () => {
    const succesCase = oddsFail(10)
        .then(value => expect(value).toEqual('success'))
        .catch(err => fail())

    const failCase = oddsFail(11)
        .then(value => fail())
        .catch(err => expect(err).toEqual(Error('fail')))

    return Promise.all([succesCase, failCase]);
});

test('chain 3 promises together', () => {
});

test('create oddsFail example using async/await', () => {
});