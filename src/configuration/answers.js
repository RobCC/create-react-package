const inquirer = require('inquirer');

const { getAvailableManagers, isNameValid } = require('../utils/packageManager');
const { getGithubUser } = require('../utils/git');

async function getAnswers(args) {
  const gitUser = await getGithubUser();

  const template = {
    type: 'list',
    name: 'template',
    message: 'Template:',
    default: args.template,
    when: args.template === '',
    choices: ['javascript', 'typescript'],
  };

  const name = {
    type: 'input',
    name: 'name',
    message: 'Package name:',
    default: args.name,
    when: args.name === '',
    validate: name => {
      if (isNameValid(name)) {
        return true;
      }

      return 'Package name is not valid';
    },
  };

  const description = {
    type: 'input',
    name: 'description',
    message: 'Description:',
    default: args.description,
    when: args.description === '',
  };

  const author = {
    type: 'input',
    name: 'author',
    message: 'Author:',
    default: gitUser,
    when: args.author === '',
  };

  const repository = {
    type: 'input',
    name: 'repository',
    message: 'Repository:',
    when: args.repository === '',
    default: ({ name, author }) => args.author || author
      ? `https://github.com/${
          args.author ? args.author.toLowerCase() : author.toLowerCase()
        }/${
          args.name ? args.name : name
        }`
      : '',
  };

  const keywords = {
    type: 'input',
    name: 'keywords',
    message: 'Keywords:',
    default: args.keywords,
    when: args.keywords.length === 0,
    filter: keywords => Array.isArray(keywords) ? keywords : keywords.split(','),
  };

  const license = {
    type: 'input',
    name: 'license',
    message: 'License:',
    default: args.license || 'ISC',
    when: args.license === '',
  };

  const packageManager = {
    type: 'list',
    name: 'manager',
    message: 'Package Manager:',
    choices: getAvailableManagers,
    when: args.manager === '',
    filter: manager => ({
      type: manager,
      isNpm: manager === 'npm',
      isYarn: manager === 'yarn',
    }),
  };

  const testLibraries = {
    type: 'checkbox',
    name: 'testLibraries',
    message: 'What testing libraries do you want to include?',
    choices: [
      'jest',
      'enzyme',
      'react-test-renderer',
    ],
    default: [],
    filter: libs => ({
      jest: libs.indexOf('jest') > -1,
      enzyme: libs.indexOf('enzyme') > -1,
      reactRenderer: libs.indexOf('react-test-renderer') > -1,
    })
  }

  const installDependencies = {
    type: 'confirm',
    name: 'install',
    message: 'Do you wish to install dependencies now? (might take some time)',
    default: false,
    when: args.install === false,
  };

  const answers = await inquirer.prompt([
    template,
    name,
    description,
    author,
    repository,
    keywords,
    license,
    packageManager,
    testLibraries,
    installDependencies,
  ]);

  return {
    ...args,
    ...answers,
    isNpm: args.manager === 'npm' || answers.manager === 'npm',
  }
}

module.exports.getAnswers = getAnswers;
