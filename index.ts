const program = require('commander');

// node build/index.js advice
// node build/index.js advice --ids=1,2,3
// node build/index.js advice --query="other"

program
  .command('advice')
  .option('-q, --query <query>', 'Search term')
  .option('-i, --ids <ids>', 'Print by ID')
  .action(function (params: any) {
    if (params.ids != undefined) {
      console.log(params.ids);
    }
    if (params.query != undefined) {
      console.log(params.query);
    }
  })

program.parse(process.argv)