import fs from "fs";

test('promise returns 3 value', () => {
    const promise = Promise.resolve(3);
    return promise.then(value => expect(value).toEqual(3));
});


test('promise returns a [1, 3] array', () => {
    const promise = Promise.resolve([1, 3]);
    const promise2 = new Promise(resolve => resolve([1, 3]));
    return promise
        .then(value => expect(value).toEqual([1, 3]));
});

//would there ever be a practical case to have a test like this?
test('promise returns "expected error" error', () => {
    const promise = Promise.reject(Error('expected error'));
    return promise
        .then(value => fail())
        .catch(err => expect(err).toEqual(Error('expected error')));
});


// This works but does this version of the above test make any sense?
test('Promise returns "expected error" error', () => {
    const promise = Promise.resolve('expected error');
    return promise
        .then(value => expect(value).toEqual('expected error'))
        .catch(err => fail());
});

// Would there ever be a situation that would merit having
// a promise that just thows errors?
// still not totally clear on situation to throw vs reject error
// also, is there unnecessary {} in lines 43 and 45?
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

test('handle thrown errors in a Promise.then', () => {
    const promise = Promise.resolve();
    return promise
        .then(value => { throw Error('expected then() error') })
        .catch(err => {
            expect(err).toEqual(Error('expected then() error'))
        });
});

//why does this one not have a test name?
//it still passes the test?
//Ans: this is a function that is being used in tests below
//missing semi-colons are ok?

const oddsFail = (n: number): Promise<string> => {
    return new Promise((resolve, reject) => {
        if (n % 2 == 0) {
            resolve('success')
        } else {
            reject(Error('fail'))
        }
    })
}

// above method labeled as a test (nested within a test)
// i guess functions should not be nested in a test,
// test should just be test, for readability and also
// so that the function can be accessed by other tests?
test('odds fail', () => {
    const oddsFail = (n: number): Promise<string> => {
        return new Promise((resolve, reject) => {
            if (n % 2 == 0) {
                resolve('success')
            } else {
                reject(Error('fail'))
            }
        });
    };
});

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

//Promise.race([
//    recordVideoOne,
//    recordVideoTwo,
//    recordVideoThree
//]).then((message) => {
//    console.log(message)
// })
test('call Promise.race and assert the fastest', () => {
    const one = new Promise((resolve, reject) => {
        const timeToWaitMs = 1;
        setTimeout(() => resolve(1), timeToWaitMs);
    });
    const ten = new Promise(resolve => setTimeout(() => resolve(10), 10));
    const twenty = new Promise(resolve => setTimeout(() => { resolve(20) }, 20));
    return Promise.race([
        one,
        ten,
        twenty
    ]).then(value => expect(value).toEqual(1));
});

test('chain 3 promises together', () => {
    const zero = Promise.resolve(0);
    const first = new Promise<number>(function (resolve, reject) {
        zero.then(zeroValue => resolve(zeroValue + 1));
    });
    const second = new Promise<number>((resolve, reject) => {
        first.then(firstValue => resolve(firstValue + 1));
    });

    return second
        .then(value => expect(value).toEqual(2))
        .catch(err => fail(err));
});

test('chain 3 promises together async/await', async () => {
    const zero = await Promise.resolve(0);
    const first = await Promise.resolve(zero + 1);
    const second = await Promise.resolve(first + 1);
    return expect(second).toEqual(2);
});

test('write to a file', () => {
    const content = '10';
    const data = new Uint8Array(Buffer.from(content));
    // const syncWrite = fs.writeFileSync(..)
    // const callbackWrite = fs.writeFile(...);
    const promiseWrite = fs.promises.writeFile('/tmp/message.txt', data);

    return promiseWrite
        .then(value => {
            expect(value).toEqual(undefined)
        })
        .catch(err => fail(err));
});


test('write + read to a file', () => {
    const content = '20';
    const data = new Uint8Array(Buffer.from(content));
    const promiseWrite = fs.promises.writeFile('/tmp/writeAndRead.txt', data);
    return promiseWrite
        .then(value => {
            expect(value).toEqual(undefined);
            return fs.promises.readFile('/tmp/writeAndRead.txt', 'utf8');
        })
        .then(promiseRead => {
            expect(promiseRead).toEqual('20');
        })
        .catch(err => fail(err));
});


test('async/await write + read to a file', async () => {
    const content = '30';
    const data = new Uint8Array(Buffer.from(content));
    const asyncPromiseWrite = 
        await fs.promises.writeFile('/tmp/writeAndRead.Async.txt', data);
    const asyncPromiseRead = 
        await fs.promises.readFile('/tmp/writeAndRead.Async.txt', 'utf8');
    return expect(asyncPromiseRead).toEqual('30');
});