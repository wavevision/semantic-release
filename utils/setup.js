const { copyFileSync, existsSync } = require('fs');
const { execSync } = require('child_process');
const { resolve } = require('path');

/**
 * @param {object} options
 * @param {string} type
 */
const handleCommand = (options, type) => {
  if (options.commands) {
    const cmd = options.commands[type];
    if (cmd) logSuccess(execSync(cmd).toString());
  }
};

/**
 * @param {string} message
 * @returns {string}
 */
const log = message =>
  process.env.NODE_ENV === 'test' ? `Log output: ${message}` : message;

/**
 * @param {Error} error
 * @returns {void}
 */
const logFailure = error => console.error(log(error.message));

/**
 * @param {string} message
 * @returns {void}
 */
const logSuccess = message => console.log(log(message));

/**
 *
 * @param {Promise<string>} setup
 * @returns {void}
 */
const run = setup => {
  setup.then(logSuccess).catch(logFailure);
};

/**
 * @async
 * @param {{ file: string, sourceDir: string, targetDir: (string|undefined), commands: ({ pre: (string|undefined), post: (string|undefined)}|undefined) }} options
 * @returns {Promise<string>}
 */
const setup = async options => {
  try {
    handleCommand(options, 'pre');
    const source = resolve(options.sourceDir, options.file);
    const target = resolve(
      process.cwd(),
      options.targetDir || '',
      options.file,
    );
    if (!existsSync(target)) copyFileSync(source, target);
    handleCommand(options, 'post');
    return `✓ ${options.file} setup successful`;
  } catch (e) {
    throw new Error(`✖ ${options.file} setup failed: ${e.message}`);
  }
};

exports.run = run;
exports.setup = setup;
