const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const FILES = {
  intro: 'intro.txt',
}

let isDebugEnabled;

function getMessage(file) {
  return path.join(__dirname, '..', 'messages', file);
}

function printIntro() {
  const introText = fs.readFileSync(getMessage(FILES.intro), 'utf8');
  console.log(introText);
}

function printInstructions(name, manager) {
  console.log('\nAll done.');
  console.log(
    'You can now build your package through:',
    chalk.green(`${manager} run build`),
  );
  console.log(
    'You can also run the dev server using:',
    chalk.green(`cd ${path.join(name, 'example')} && ${manager} start`),
  );
}

function printEndMessage(text) {
  console.log(chalk.cyan.bold(`\n${text}`));
}

function setDebug(isDebug) {
  isDebugEnabled = isDebug;
}

function debug(...args) {
  if (isDebugEnabled) {
    console.log('[LOG] ', ...args);
  }
}

module.exports.printEndMessage = printEndMessage;
module.exports.printIntro = printIntro;
module.exports.printInstructions = printInstructions;
module.exports.setDebug = setDebug;
module.exports.debug = debug;

module.exports = {
  printEndMessage : printEndMessage,
  printIntro : printIntro,
  printInstructions : printInstructions,
  setDebug : setDebug,
  debug : debug,
};
