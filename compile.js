const path = require('path');
const fs = require('fs');
const solc = require('solc');

const compileFilePath = path.resolve(__dirname, 'contracts', 'Demo.sol');
const source = fs.readFileSync(compileFilePath, 'utf8');

//console.log(solc.compile(source, 1))
module.exports = solc.compile(source, 1).contracts[':Demo'];
