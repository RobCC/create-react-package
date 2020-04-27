const path = require('path');
const globby = require('globby');
const unixify = require('unixify');
const makeDir = require('make-dir');

const { copyFile } = require('./file');

function getDestinationPath(name) {
  return path.join(process.cwd(), name);
}

function createDestFolder(name) {
  const dest = getDestinationPath(name);

  makeDir.sync(dest);

  return dest;
}

function getTemplateFiles(template) {
  const templatePath = unixify(
    path.join(__dirname, '../..', 'template', template)
  );

  return [
    templatePath,
    globby.sync(templatePath, { dot: true }),
  ];
}

function copyFiles({ templatePath, destRootPath, files, answers }) {
  try {
    files.forEach(file => copyFile({
      file,
      templatePath,
      destRootPath,
      answers
    }));
  } catch (error) {
    throw error;
  }
}

module.exports.getDestinationPath = getDestinationPath;
module.exports.createDestFolder = createDestFolder;
module.exports.getTemplateFiles = getTemplateFiles;
module.exports.copyFiles = copyFiles;
