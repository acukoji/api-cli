import program from 'commander';
import { advice } from './src/command/advice';
import { news } from './src/command/hackerNews';
import { convertToAscii } from './src/command/imageToAscii';

//import { hackerNewsIdsAll } from './src/api/hackerNews';

// ts-node ./index.ts advice
// ts-node ./index.ts advice --ids=1,2,3
// ts-node ./index.ts advice --query="other"

program
  .command('advice')
  .option('-i, --ids <ids>', 'Print by ID')
  .option('-q, --query <query>', 'Search term')
  .action(function (params: any) {
    try {
      advice(params.ids, params.query);
    } catch (error) {
      console.error(error.message);
    }
  });

program
  .command('cat-facts')
  .option('-a, --alpha <alpha>', 'Some description')
  .action(function (params: any) {
    console.log(params.alpha)
  })

program
  .command('imageToAscii')
  .option('-u, --url <url>', 'url of image')
  .action(function (params: any) {
    try {
      convertToAscii(params.url)
    } catch (error) {
      console.error(error.message);
    }
    //console.log(params.url)
  });
//hackerNews
// ts-node ./index.ts hn --ids 8863,8265435 (compile and run ts file)
//--every single test will re-compile the whole file which can lead to a time-out
//of integration test.  
// so an alternate way to not time-out is to separate the compiling and running of test
// tsc && node ./build/index.js hn --ids 8863,8265435 (compile first, then run js file)
// Print title, time, author name

program
  .command('hn')
  .option('-i, --ids <ids>', 'Print by ID')
  .option('-u, --users <users>', 'Print user info')
  .option('-t, --top [top]', 'Print top x-number of stories')
  .action(function (params: any) {
    try {
      news(params.ids, params.users, params.top);
    } catch (error) {
      console.error(error.message);
    }
  });

program.parse(process.argv);
