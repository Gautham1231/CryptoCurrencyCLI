#!/usr/bin/env node

const { Command } = require('commander');
const program = new Command();

const pkg = require('../package.json');

program
    .version(pkg.version)
    .command('key', 'Manage API key --https://coinmarketcap.com')
    .command('check', 'Check Coin Price Info')
    .parse(process.argv);

