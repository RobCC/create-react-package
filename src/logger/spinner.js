const ora = require('ora');
const spinners = require('cli-spinners');
const logSymbols = require('log-symbols');

let spinner;

function initSpinner() {
  spinner = ora({
    spinner: spinners.dots,
  });

  return spinner;
}

function getSpinner() {
  if (!spinner) {
    return initSpinner();
  }

  return spinner;
}

function spinnerSuccess() {
  spinner.stopAndPersist({
    symbol: logSymbols.success
  });
}

function spinnerError() {
  spinner.stopAndPersist({
    symbol: logSymbols.error
  });
}

async function startOperation(text, processFn) {
  const spinner = getSpinner();

  spinner.start(text);

  try {
    await processFn();
  } catch(e) {
    spinnerError();
    throw e;
    process.exit(1);
  }

  spinnerSuccess();
}

module.exports.spinnerSuccess = spinnerSuccess;
module.exports.spinnerError = spinnerError;
module.exports.getSpinner = getSpinner;
module.exports.startOperation = startOperation;
