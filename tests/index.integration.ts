import { exec } from 'child_process';
import { EOL as NEW_LINE } from 'os';
import { promisify } from 'util';
// import { shuffle } from './helper';

const execPromise = promisify(exec);

describe('advice api', () => {
    it('test ids without any ids', async () => {
        const response = await execPromise('ts-node ./index.ts advice --ids=');
        expect(response.stderr).toEqual('error: no id# was entered.');
    });

    // TODOD: (acukoji) update your API CLI advice code to print this error.
    it('test ids are not numbers', async () => {
        const response = await execPromise('ts-node ./index.ts advice --ids a,b,c');
        expect(response.stderr).toEqual('error: a is not a number');
    });

    // it('test ids command successfully returns ordered advice', async () => {
    //     const response = await execPromise('ts-node ./index.ts advice --ids mother');

    //     const expected: string = [
    //         'Advice(031): Never let your Mother cut your hair.',
    //         'Advice(208): Play is the true mother of invention.'
    //     ].join(NEW_LINE);

    //     expect(response.stdout).toEqual(expected);
    // });
});