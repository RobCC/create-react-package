const handlebars = require('handlebars');

handlebars.registerHelper('isNpm', manager => manager && manager === 'npm');
handlebars.registerHelper('isYarn', manager => manager && manager === 'yarn');
handlebars.registerHelper('hasJest', libs => libs.indexOf('jest') > -1);
handlebars.registerHelper('hasEnzyme', libs => libs.indexOf('enzyme') > -1);
handlebars.registerHelper('hasJest', libs => libs.indexOf('react-test-renderer') > -1);
