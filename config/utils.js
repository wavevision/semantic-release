const { readFileSync } = require('fs');
const { resolve } = require('path');

const { validate } = require('schema-utils');

const {
  CONFIG_GITLAB,
  GITLAB_BASE_URL,
  GITLAB_ISSUE_TEMPLATE,
  TEMPLATE_TYPE_COMMIT,
} = require('./constants');

/**
 * @param {object} options
 * @returns {(object|undefined)}
 */
const makeIssueResolution = options => {
  if (options.config === CONFIG_GITLAB) {
    return {
      baseUrl: GITLAB_BASE_URL,
      template: GITLAB_ISSUE_TEMPLATE,
    };
  }
};

/**
 * @param {...string} basePath
 * @returns {function(string): string}
 */
const makeTemplate = (...basePath) => name =>
  readFileSync(resolve(...basePath, `${name}.hbs`)).toString();

/**
 * @param {string} rule
 * @returns {object}
 */
const mapRule = rule => {
  const type = {
    type: 'array',
    items: { type: 'string' },
    minItems: 1,
  };
  return {
    [rule]: {
      description: `Setup gitmoji meaning ${rule} release`,
      oneOf: [
        type,
        {
          type: 'object',
          properties: { exclude: type, include: type },
          additionalProperties: false,
        },
      ],
    },
  };
};

/**
 *
 * @param {object} previous
 * @param {object} current
 * @returns {object}
 */
const reduceRules = (previous, current) => ({ ...previous, ...current });

/**
 * @param {object} options
 * @param {string} type
 * @returns {(string|undefined)}
 */
const resolveTemplate = (options, type) => {
  if (options.templates && options.templates[type]) {
    return options.templates[type];
  }
  if (type === TEMPLATE_TYPE_COMMIT) type += `.${options.config}`;
  return makeTemplate(__dirname, 'templates')(type);
};

/**
 * @param {object} schema
 * @param {object} options
 */
const validateOptions = (schema, options) => {
  try {
    validate(schema, options);
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
};

exports.makeIssueResolution = makeIssueResolution;
exports.makeTemplate = makeTemplate;
exports.mapRule = mapRule;
exports.reduceRules = reduceRules;
exports.resolveTemplate = resolveTemplate;
exports.validateOptions = validateOptions;
