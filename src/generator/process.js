const path = require('path');
const execa = require('execa');

const { getSpinner, spinnerSuccess, spinnerError } = require('../logger/spinner');

async function installDependencies(manager, destRootPath) {
  await execa(manager, ['install'], { cwd: destRootPath });
}

async function installExampleDependencies(manager, destRootPath) {
  const spinner = getSpinner();
  const examplePath = path.join(destRootPath, 'example');

  await execa(manager, ['install'], { cwd: examplePath });
}

module.exports.installDependencies = installDependencies;
module.exports.installExampleDependencies = installExampleDependencies;
