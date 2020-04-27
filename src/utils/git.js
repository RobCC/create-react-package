const configPath = require('git-config-path')('global');
const getGithubUserName = require('github-username');
const parse = require('parse-git-config');

function getConfig(configPath) {
  return parse.sync({
    path: configPath,
  });
}

async function getGithubUser() {
  if (!configPath) {
    return ''
  }

  const { github, user } = getConfig(configPath);

  if (github && github.user) {
    return github.user;
  } else if (user && user.email) {
    return getGithubUserName(user.email);
  } else {
    return '';
  }
}


module.exports.getGithubUser = getGithubUser;
