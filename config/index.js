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
 *  branches: string[],
 *  rules: ({
 *    major: ({ exclude: (string[]|undefined), include: (string[]|undefined) }|string[]|undefined),
 *    minor: ({ exclude: (string[]|undefined), include: (string[]|undefined) }|string[]|undefined),
 *    patch: ({ exclude: (string[]|undefined), include: (string[]|undefined) }|string[]|undefined)
 *  }|undefined),
 *  templates: ({ notes: (string|undefined), commit: (string|undefined) }|undefined),
 *  git: ({ enabled: boolean, assets: (string[]|undefined) }|undefined),
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
    plugins.push(['@semantic-release/npm']);
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
  plugins.push(`@semantic-release/${options.config}`);
  return {
    branches: options.branches,
    plugins: plugins,
    tagFormat: TAG_FORMAT,
  };
};

module.exports = makeConfig;
