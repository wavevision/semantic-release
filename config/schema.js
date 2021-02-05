const { mapRule, reduceRules } = require('./utils');
const { CONFIG_GITLAB, CONFIG_GITHUB, RULES } = require('./constants');

module.exports = {
  title: 'The Wavevision semantic release setup',
  type: 'object',
  properties: {
    config: {
      description: 'Mandatory config type',
      enum: [CONFIG_GITLAB, CONFIG_GITHUB],
    },
    rules: {
      description: 'Gitmoji release rules',
      type: 'object',
      properties: {
        ...RULES.map(mapRule).reduce(reduceRules),
      },
      additionalProperties: false,
    },
    templates: {
      description: 'Release notes templates definition',
      type: 'object',
      properties: {
        notes: {
          description: 'Release notes .hbs template content',
          type: 'string',
        },
        commit: {
          description: 'Commit .hbs template content',
          type: 'string',
        },
      },
      additionalProperties: false,
    },
    npm: {
      description: 'Setup @semantic-release/npm plugin',
      type: 'object',
      properties: {
        enabled: {
          description: 'Enable @semantic-release/npm',
          type: 'boolean',
        },
      },
      additionalProperties: false,
    },
    git: {
      description: 'Setup @semantic-release/git plugin',
      type: 'object',
      properties: {
        enabled: {
          description: 'Enable @semantic-release/git',
          type: 'boolean',
        },
        assets: {
          description: 'Relative paths to assets to be committed with release',
          type: 'array',
          items: [
            {
              type: 'string',
            },
          ],
          additionalItems: false,
          minItems: 1,
        },
      },
      additionalProperties: false,
    },
  },
  additionalProperties: false,
  required: ['config'],
};
