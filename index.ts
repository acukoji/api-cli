import program from 'commander';
import { advice } from './src/command/advice';
import { news } from './src/command/hackerNews';
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

//hackerNews
// ts-node ./index.ts hn --ids 8863,8265435
// Print title, time, author name

program
  .command('hn')
  .option('-i, --ids <ids>', 'Print by ID')
  .option('-u, --users <users>', 'Print user info')
  .option('-t, --top <top>', 'Print top x-number of stories')
  .action(function (params: any) {
    try {
      news(params.ids, params.users, params.top);
    } catch (error) {
      console.error(error.message);
    }
  });

program.parse(process.argv);
