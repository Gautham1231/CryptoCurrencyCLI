const { Command } = require('commander');
const check = require('../commands/check');
const program = new Command();

program
  .command('price')
  .description('Check Price of Coins')
  .option(
    '--coin <type>',
    'Add specific coin types in CSV format',
    'BTC,ETH,XRP'
  )
  .option('--cur <currency>', 'Change the currency', 'USD' )
  .action(cmd => {
    console.log('Command options:', cmd);
    check.price(cmd);
  });

  

program.parse(process.argv); 

if(!process.argv[2]) {
    program.outputHelp();
}