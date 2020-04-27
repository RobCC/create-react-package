const which = require('which');
const validate = require('validate-npm-package-name');

function hasNpm() {
  return which.sync('npm', { nothrow: true });
}

function hasYarn() {
  which.sync('yarn', { nothrow: true });
}

const getAvailableManagers = () => {
  const availableManagers = [];

  if (hasNpm()) {
    availableManagers.push('npm');
  }

  if (hasYarn()) {
    availableManagers.push('yarn');
  }

  return availableManagers;
};


const isNameValid = name => {
  if (!name) {
    return false;
  }

  const { validForNewPackages } = validate(name);

  return validForNewPackages;
}

module.exports.isNameValid = isNameValid;
module.exports.getAvailableManagers = getAvailableManagers;
