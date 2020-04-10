import { exec } from 'child_process';
import { EOL as NEW_LINE } from 'os';
import { promisify } from 'util';

// Run tests
// jest -c jest.config.integration.js --watchAll

const execPromise = promisify(exec);

beforeAll(async () => {
    // following line of code compiles (ts -> js) first
    // before running the tests below
    // tsc is global command in terminal, 
    // but also tsc is installed locally via package json
    // the below code is calling on the local tsc
    // before adding this line of code, it was compiling before running
    // each test, causing it to timeout.
    await execPromise('./node_modules/.bin/tsc');
});

describe('advice api', () => {
    it('test ids without any ids', async () => {
        const response = await execPromise('node ./build/index.js advice --ids=');
        expect(response.stderr).toEqual('error: no id# was entered.');
    });

    it('test ids are not numbers', async () => {
        const response = await execPromise('node ./build/index.js advice --ids a,b,c');
        expect(response.stderr).toEqual('error: a is not a number\n');
    });

    it('test ids command successfully returns advice', async () => {
        const response = await execPromise('node ./build/index.js advice --ids 1,10,100');

        const expected: string = [
            'Remember that spiders are more afraid of you, than you are of them.',
            'Never pay full price for a sofa at DFS.',
            'Everybody makes mistakes.'
        ].join(NEW_LINE);

        expect(response.stdout).toEqual(expected);
    });

    it('test query command successfully returns advice', async () => {
        const response = await execPromise('node ./build/index.js advice --query email');

        const expected: string = [
            'Always double check you actually attached the file to the email.',
            'Do not check work email on your days off.',
            "Never write in an email to someone, something which you wouldn't say to that person's face."
        ].join(NEW_LINE);

        expect(response.stdout).toEqual(expected);
    });
});

// TODO: test the edge cases like --top, -top=0, etc.
describe('hn', () => {
    it('test ids without any ids', async () => {
        const response = await execPromise('node ./build/index.js hn --ids=');
        expect(response.stderr).toEqual('Error: no id# was entered\n');
    });

    it('test ids command successfully returns title/time/by', async () => {
        const response = await execPromise('node ./build/index.js hn --ids 8863,8265435');

        const expected: string = [
            'Title: My YC app: Dropbox - Throw away your USB drive; Time: 1175714200; By: dhouston\n',
            'Title: Students Grade Teachers and Panorama Education (YC S13) Harnesses the Data; Time: 1409778049; By: jl\n'
        ].join(NEW_LINE);

        //console.log(response)
        //console.log(response.stdout)
        // console.log(expected);
        
        expect(response.stdout).toEqual(expected);
    });
    it('test user command successfully returns UserData', async () => {
        const response = await execPromise('node ./build/index.js hn --users jl,cevaris');

        const expected: string = [
            'About: This is a test',
            'Created: 1173923446',
            'Id: jl',
            'Karma: 4227',
            'About: Software Developer<p>TestOne',
            'TestTwo',
            'Created: 1361637682',
            'Id: cevaris',
            'Karma: 24' + '\n'
        ].join(NEW_LINE);

        //console.log(response)
        //console.log(expected);

        expect(response.stdout).toEqual(expected);
    });

    it('test top command without equals sign returns the top id# and title/time/by', async () => {
        const response = await execPromise('node ./build/index.js hn --top');

        const expected: string = [
            '[ 22630665 ]',
            'Title: Netflix to cut streaming quality in Europe for 30 days; Time: 1584645484; By: tompagenet2' + '\n',
        ].join(NEW_LINE);

        //console.log(response.stdout)
        //console.log(expected);
        
        expect(response.stdout).toEqual(expected);
    });

    it('test top=0 command returns Error', async () => {
        const response = await execPromise('node ./build/index.js hn --top=0');

        const expected: string =
            'Error: number must be at least 1.' + '\n'

        //console.log(response)
        //console.log(expected);
        
        expect(response.stderr).toEqual(expected);
    });
});
