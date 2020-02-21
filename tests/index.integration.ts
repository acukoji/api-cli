import { exec } from 'child_process';
import { EOL as NEW_LINE } from 'os';
import { promisify } from 'util';
// import { shuffle } from './helper';

const execPromise = promisify(exec);

describe('advice api', () => {
    it('test ids are not numbers', async () => {
        const response = await execPromise('./bin/advice --ids a,b,c');
        expect(response.stderr).toEqual('Error: a is not a number');
    });

    it('test query command successfully returns ordered advice', async () => {
        const response = await execPromise('./bin/advice --query mother');

        const expected: string = [
            'Advice(031): Never let your Mother cut your hair.',
            'Advice(208): Play is the true mother of invention.'
        ].join(NEW_LINE);

        expect(response.stdout).toEqual(expected);
    });
});