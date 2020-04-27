
const getArgs = require('./configuration/args');
const { getAnswers } = require('./configuration/answers');
const { startOperation } = require('./logger/spinner');
const {
  printIntro,
  printInstructions,
  printEndMessage,
} = require('./logger/logger');
const {
  createDestFolder,
  getTemplateFiles,
  copyFiles,
} = require('./generator/template');
const {
  installDependencies,
  installExampleDependencies,
} = require('./generator/process');

module.exports = async function() {
  printIntro();

  const args = await getArgs();
  const answers = await getAnswers(args);

  const destRootPath = createDestFolder(answers.name);
  const [templatePath, files] = getTemplateFiles(answers.template);

  await startOperation('Copying files', () => {
    copyFiles({ templatePath, destRootPath, files, answers })
  });

  if (answers.install) {
    await startOperation('Installing dependencies', async () => {
      await installDependencies(answers.manager, destRootPath);
    });
    await startOperation("Installing example's dependencies", async () => {
      await installExampleDependencies(answers.manager, destRootPath);
    });
  }

  printInstructions(answers.name, answers.manager);
  printEndMessage('Happy coding!');
  process.exit(0);
}

module.exports().catch((error) => {
  console.error(error);
  process.exit(1);
})
