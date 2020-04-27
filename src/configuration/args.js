const { program } = require('commander');

module.exports = async () => {
  program
    .name('create-react-package')
    .usage('[options]')
    .option('-t, --template <template>', 'template to be used (javascript or typescript)', 'typescript')
    .option('-n, --name <name>', 'package name', '')
    .option('-d, --description <description>', 'package description', '')
    .option('-a, --author <author>', 'package author', '')
    .option('-r, --repository <repository>', 'repository url', '')
    .option(
      '-k, --keywords <keywords>',
      'package keywords, comma separated',
      keywords => keywords.split(','),
      [],
    )
    .option('-l, --license <license>', 'package license', '')
    .option('-m, --manager <npm|yarn>', 'package manager', '')
    .option('-i, --install', 'install dependencies', false)
    .parse(process.argv)
  ;

  return program.opts();
}
