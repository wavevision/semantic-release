const test = require('ava');

const makeConfig = require('..');
const { makeTemplate: makeTemplate } = require('../utils');
const {
  CONFIG_GITLAB: CONFIG_GITLAB,
  GITLAB_BASE_URL: GITLAB_BASE_URL,
  GITLAB_ISSUE_TEMPLATE: GITLAB_ISSUE_TEMPLATE,
  RELEASE_MESSAGE: RELEASE_MESSAGE,
  TAG_FORMAT: TAG_FORMAT,
} = require('../constants');

const template = makeTemplate(__dirname, '..', 'templates');

test('makeConfig', function (t) {
  const config = makeConfig({
    config: CONFIG_GITLAB,
    rules: {
      major: { include: [':boom:'], exclude: [':sparkles:'] },
      minor: [':sparkles:'],
      patch: [':bug:'],
    },
    git: { enabled: true, assets: ['package.json'] },
    npm: { enabled: true },
  });
  t.deepEqual(config, {
    plugins: [
      [
        'semantic-release-gitmoji',
        {
          issueResolution: {
            baseUrl: GITLAB_BASE_URL,
            template: GITLAB_ISSUE_TEMPLATE,
          },
          releaseNotes: {
            template: template('notes'),
            partials: {
              commitTemplate: template('commit.gitlab'),
            },
          },
          releaseRules: {
            major: { include: [':boom:'], exclude: [':sparkles:'] },
            minor: [':sparkles:'],
            patch: [':bug:'],
          },
        },
      ],
      '@semantic-release/npm',
      [
        '@semantic-release/git',
        {
          assets: ['package.json'],
          message: RELEASE_MESSAGE,
        },
      ],
      '@semantic-release/gitlab',
    ],
    tagFormat: TAG_FORMAT,
  });
});
