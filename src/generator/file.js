const fs = require('fs');
const path = require('path');
const makeDir = require('make-dir');
const handlebars = require('handlebars');

require('./helpers');

const FORMAT = 'utf8';
const specialFormats = [
  'ico',
  'jpg',
  'png',
];

function hasSpecialFormat(name) {
  return name.match(new RegExp(
    `.(${specialFormats.join('|')})$`
  ));
}

function writeFile({ file, fileRelPath, destPath, answers }) {
  const isSpecial = hasSpecialFormat(file);

  try {
    const rawContent = isSpecial
      ? fs.readFileSync(file)
      : fs.readFileSync(file, FORMAT);

    if (isSpecial) {
      fs.writeFileSync(destPath, rawContent);
    } else {
      const template = handlebars.compile(rawContent);
      const content = template(answers);

      fs.writeFileSync(destPath, content, FORMAT);
    }
  } catch(error) {
    throw new Error(`Error with ${fileRelPath}: ${error}`);
    process.exit(1);
  }
}

function copyFile({ file, templatePath, destRootPath, answers }) {
  const fileRelPath = path.relative(templatePath, file);
  const destPath = path.join(destRootPath, fileRelPath);
  const destFileDir = path.parse(destPath).dir;

  makeDir.sync(destFileDir);

  writeFile({ file, fileRelPath, destPath, answers });

  return fileRelPath;
}

module.exports.copyFile = copyFile;
