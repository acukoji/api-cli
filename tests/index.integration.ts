import { exec } from 'child_process';
import { EOL as NEW_LINE } from 'os';
import { promisify } from 'util';

// Run tests
// jest -c jest.config.integration.js --watchAll

const execPromise = promisify(exec);

describe('advice api', () => {
    it('test ids without any ids', async () => {
        const response = await execPromise('ts-node ./index.ts advice --ids=');
        expect(response.stderr).toEqual('error: no id# was entered.');
    });

    it('test ids are not numbers', async () => {
        const response = await execPromise('ts-node ./index.ts advice --ids a,b,c');
        expect(response.stderr).toEqual('error: a is not a number\n');
    });

    it('test ids command successfully returns advice', async () => {
        const response = await execPromise('ts-node ./index.ts advice --ids 1,10,100');

        const expected: string = [
            'Remember that spiders are more afraid of you, than you are of them.',
            'Never pay full price for a sofa at DFS.',
            'Everybody makes mistakes.'
        ].join(NEW_LINE);

        expect(response.stdout).toEqual(expected);
    });

    it('test query command successfully returns advice', async () => {
        const response = await execPromise('ts-node ./index.ts advice --query email');

        const expected: string = [
            'Always double check you actually attached the file to the email.',
            'Do not check work email on your days off.',
            "Never write in an email to someone, something which you wouldn't say to that person's face."
        ].join(NEW_LINE);

        expect(response.stdout).toEqual(expected);
    });
});

describe('hn', () => {
    it('test ids without any ids', async () => {
        const response = await execPromise('ts-node ./index.ts hn --ids=');
        expect(response.stderr).toEqual('error: no id# was entered.');
    });
});