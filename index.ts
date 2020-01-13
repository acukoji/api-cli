import program from 'commander';
import { advice } from './src/command/advice';

// ts-node ./index.ts advice
// ts-node ./index.ts advice --ids=1,2,3
// ts-node ./index.ts advice --query="other"

program
  .command('advice')
  .option('-i, --ids <ids>', 'Print by ID')
  .option('-q, --query <query>', 'Search term')
  .action(function (params: any) {
    advice(params.ids, params.query);
  });

program
  .command('cat-facts')
  .option('-a, --alpha <alpha>', 'Some description')
  .action(function (params: any) {
    console.log(params.alpha)
  })

program.parse(process.argv);