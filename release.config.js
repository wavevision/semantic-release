const makeConfig = require('./config');
const { CONFIG_GITHUB } = require('./config/constants');

module.exports = makeConfig({
  config: CONFIG_GITHUB,
  branches: ['master'],
  git: { enabled: true, assets: ['package.json'] },
  npm: { enabled: true },
});
