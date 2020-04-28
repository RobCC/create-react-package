
const getArgs = require('./configuration/args');
const { getAnswers } = require('./configuration/answers');
const { startOperation } = require('./logger/spinner');
const logger = require('./logger/logger');
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
  logger.printIntro();

  const args = await getArgs();
  const answers = await getAnswers(args);

  logger.setDebug(args.debug)

  const destRootPath = createDestFolder(answers.name);
  const [templatePath, files] = getTemplateFiles(answers.template);

  logger.debug('Destination root path', destRootPath);
  logger.debug('Template path', templatePath);

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

  logger.printInstructions(answers.name, answers.manager);
  logger.printEndMessage('Happy coding!');
  process.exit(0);
}

module.exports().catch((error) => {
  console.error(error);
  process.exit(1);
})
