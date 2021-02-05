const schema = require('./schema');
const {
  makeIssueResolution,
  resolveTemplate,
  validateOptions,
} = require('./utils');
const {
  RELEASE_MESSAGE,
  TAG_FORMAT,
  TEMPLATE_TYPE_COMMIT,
  TEMPLATE_TYPE_NOTES,
} = require('./constants');

/**
 * @param {{
 *  config: string,
 *  rules: ({
 *    major: ({ exclude: string[], include: string[] }|string[]|undefined),
 *    minor: ({ exclude: string[], include: string[] }|string[]|undefined),
 *    patch: ({ exclude: string[], include: string[] }|string[]|undefined)
 *  }|undefined),
 *  templates: ({ notes: string, commit: string }|undefined),
 *  git: ({ enabled: boolean, assets: string[] }|undefined),
 *  npm: ({ enabled: boolean }|undefined)
 * }} options
 * @returns {object}
 */
const makeConfig = function (options) {
  validateOptions(schema, options);
  const plugins = [
    [
      'semantic-release-gitmoji',
      {
        issueResolution: makeIssueResolution(options),
        releaseNotes: {
          template: resolveTemplate(options, TEMPLATE_TYPE_NOTES),
          partials: {
            commitTemplate: resolveTemplate(options, TEMPLATE_TYPE_COMMIT),
          },
        },
        releaseRules: options.rules,
      },
    ],
  ];
  if (options.npm && options.npm.enabled) {
    plugins.push('@semantic-release/npm');
  }
  if (options.git && options.git.enabled) {
    plugins.push([
      '@semantic-release/git',
      {
        assets: options.git.assets,
        message: RELEASE_MESSAGE,
      },
    ]);
  }
  plugins.push('@semantic-release/' + options.config);
  return {
    plugins: plugins,
    tagFormat: TAG_FORMAT,
  };
};

module.exports = makeConfig;
