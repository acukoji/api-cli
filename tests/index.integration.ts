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

    it('test top command without equals sign returns the top id# and title/time/by and' +
    'asserting that it contains Title: Time: By:', async () => {
        const response = await execPromise('node ./build/index.js hn --top');
        expect(response.stdout).toMatch(/Title:/)
        expect(response.stdout).toMatch(/Time:/)
        expect(response.stdout).toMatch(/By:/)
        expect(response.stdout).toMatch(/[ \d+ ]/)
        //const expected: string = [
        //    '[ 22630665 ]',
        //    'Title: Netflix to cut streaming quality in Europe for 30 days; Time: 1584645484; By: tompagenet2' + '\n',
        //].join(NEW_LINE);

        //console.log(response.stdout)
        //console.log(expected);
        
        //expect(response.stdout).toEqual(expected);
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
describe('imageToAscii api', () => {
    it('test dog image link', async () => {
        const response = await execPromise('node ./build/index.js imageToAscii --url https://octodex.github.com/images/octofez.png');
        const expected: string = `https://octodex.github.com/images/octofez.png
@@@@@@@@@@@@@@@@@@@@@@@@@@8Cti:::;;itfLCG0880CLf1i;:,,..,:;iii;:,.,,:;i1tLCG080GCLfti;;:::itC8@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@0Li,.           ..,:,..        ,L088@@@880L,       ..,:,..           .,iL0@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@0fi,                              L@@@@@@@@@@@L                             ,if0@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@0Li,                                :8@@@@@@@@@@@8:                               ,iL0@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@8Li,                                   t@@@@@@@@@@@@@1                                  ,iL8@@@@@@@@@@@@@@
@@@@@@@@@@@8G1,                                      L@@@@@@@@@@@@@L                                     ,1G8@@@@@@@@@@@
@@@@@@@@@8L;.                                        L@@@@@@@@@@@@@L                                       .;L8@@@@@@@@@
@@@@@@@0t:                                           1@@@@@@@@@@@@@1                                          :t0@@@@@@@
@@@@@8f,                                             :8@@@@@@@@@@@8:                                            ,f8@@@@@
@@@@G;       ..                                      .G@@@@@@@@@@@G.                                     ..       ;G@@@@
@@@L,     .,,.                                        t@@@@@@@@@@@t                                       .,,.     ,L@@@
@@8:      ,.                                          :8@@@@@@@@@8:                                         .,      :8@@
@@@i     ..                                           .G@@@@@@@@@G.                                          ..     i@@@
@@@L     .             .              .,:::,,          L@@@@@@@@@f          ,,:::,.             .             .     L@@@
@@@0.                ..               :;;;;;;.         t@@@@@@@@@t         ,;;;;;;:              ..                .0@@@
@@@8:               ..                .,,,,,.          f@@@@@@@@@f          .,,,,,.               ..               :8@@@
@@@@;              .,                                 .G@@@@@@@@@G.                                ,.              ;@@@@
@@@@1             .,.                                 t@@@@@@@@@@@t        .                       .,.             1@@@@
@@@@f             ,,                       .,,..     ;8@@@@@@@@@@@8;     ..... ..                   ,,             f@@@@
@@@@C.           ,,.                ,..,ft..t:,.,,  ,G@@@@@@@@@@@@@G,  .,..;L1.,1,..,               .,,           .C@@@@
@@@@8,          .,.                 ;,,,1i   .,.,:  L@@@@@@@@@@@@@@@L  ,:.,,1;   .,.:.               .,.          ,8@@@@
@@@@@1          ,;;                 :.,,     .,.,: ;8@@@@@@@@@@@@@@@8; ,:.,.     .,.:,               ;;,          1@@@@@
@@@@@0:        .:C0:                :,.,.    .,.,, L@@@@@@@@@@@@@@@@@L .:.,,.   .,,.;.              ,0C:.        :0@@@@@
@@@@@@G:      .:L@@G:               .,.... .....,.:8@8CLLLLLLLLLLLC8@8: ,..... .....,              .L@@L:.      :G@@@@@@
@@@@@@@01.   .:L@@@@G;                            1@8i,,...,,,..,,,t@@1.                          .f@@@@L:.   .10@@@@@@@
@@@@@@@@@L:,,iG@@@@@@81.                         ,f@0:..  .,,,  ...i@@f,                         .f@@@@@@Gi,,:L@@@@@@@@@
@@@@@@@@@@8GG8@@@@@@@@@C:                        ,L@@f;,...,.,...,iC@@L,                        :C@@@@@@@@8GG8@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@8L;.                     ,f@@@8Li;::,::;1C@@@@f,                      ,f8@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@8C1,                   ,iC8@@@@80CfC08@@@@8Ci,                   .;f8@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@8Ct;.               .:;1ffffLLftffLtfff1;:.               .,ifG@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@80Cti:,.           .:::,1fffffffi,:::             .,;1fG8@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@8@@80G1;f0@@@@@@@@@@@@@80GCLt1i;::.   ,100CLLfffLLGf;;,   .,:;;i1fLC08@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@8L;.   ,t8@@@@@@@@@@@@@@@@@@@@0t,    f@@@8000008@01.    ,t0@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@8f,     :G@@@@@@@@@@@@@@@@@@G;    :f@@@@@@@@@@@@@@f.     ;G@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@81       ,f8@@@@@@@@@@@@@@@C,   .:f8@@@8@@@@@@@@@@0i      ,G@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@0Gt.       :f0@@@@@@@@@@@@0:    .1G@@@@@@@88@@@@@@Gt.      :8@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@G:;,         ,;tLCGGGGCft;,     .;G8@@@@@@@@@@@88@i         L@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@t                ....           ,i10Lt8@@@8@@8;;t.         t@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@8f:.                              ::  L8Gi:C@C.            1@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@8GLf1                               ,;.  .;,             1@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@8G1     .           ..                                 1@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@0L111tfCL.  .;fL. ,1G1       :,      iC;      ::       1@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@G1tC0@@8fC8@@1      i0i      t@t      i0;      1@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@1   .  C@i      t@t      i@L  ,.  1@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@1 .:;,,G@i      t@t     .i@G::;:. 1@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@t,:;;;;G@1:,  . t@t.. .:;1@G;;;;;,f@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@88f;;;;;;C01;;::;:t0t:;::;;10C;;;;;;f888@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@8880000GG1;;;;;;CG1;;;;;;tGt;;;;;;1GC;;;;;;iCGG0000888@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@8800GGGGGGGG0L111tttfGG1;;;;;;tGt;;;;;;1GGLLfffffC00GGGGGGGG0088@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@880GGGGGGGGGGG08@88@8@@@@0G1;;;;;;tGf;;;;;;tG8@@@@@@@@@@0GGGGGGGGGGGG008@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@80GGGGGGGGGGGGGG8@@8@@@@@@808GCCCCCC080GGGGGG0808@@@8@@8@@8GGGGGGGGGGGGGGG08@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@80GGGGGGGGGGGGGGGG0880888080G0@@8@@@@@@@@8@@@@8@@0G0000800800GGGGGGGGGGGGGGGGG08@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@0GGGGGGGGGGGGGGGGG00000000000G0000880080800880000G00000000000GGGGGGGGGGGGGGGGGG0@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@0GGGGGGGGGGGGGGGGG000000000000000000000000000000000000000000GGGGGGGGGGGGGGGGGGG0@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@0GGGGGGGGGGGGGGGGGGGCCCCCCCGG0GGCCCCGG0GCCCCCCGGGCCCLLLLCGGGGGGGGGGGGGGGGGGGG08@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@80GGGGGGGGGGGGGGGGGGLLLLLLLGGCLLLLLLCGCLLLLLLLGGLLLLLLLGGGGGGGGGGGGGGGGGGG08@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@8800GGGGGGGGGGGGGGCLLLLLLGGCLLLLLLCGCLLLLLLLGGLLLLLLCGGGGGGGGGGGGGGG0088@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@88000GGGGGGGGGLLLLLLLGGCLLLLLLCGCLLLLLLLGGLLLLLfLGGGGGGGGGG00088@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@8880000GGLffLLLLGGCLLLLLLCGCfLffLLLGGffLLffLGGG0000888@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@80GGGGCC00CLLffffCGCffffLLC0GLLCCGG0888@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
`;


        // console.log(response.stdout)
        //console.log(expected);
        
        expect(response.stdout).toEqual(expected);
    });

});
