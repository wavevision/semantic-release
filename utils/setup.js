const { copyFileSync } = require('fs');
const { execSync } = require('child_process');
const { resolve } = require('path');

/**
 * @param {string} message
 * @returns {string}
 */
const log = message =>
  process.env.NODE_ENV === 'test' ? `Log output: ${message}` : message;

/**
 * @param {Error} error
 */
const logFailure = error => console.error(log(error.message));

/**
 * @param {string} message
 */
const logSuccess = message => console.log(log(message));

/**
 *
 * @param {Promise<string>} setup
 */
const run = setup => {
  setup.then(logSuccess).catch(logFailure);
};

/**
 * @param {{file: string, sourceDir: string, targetDir: (string|undefined), command: (string|undefined)}} options
 * @returns {Promise<string>}
 */
const setup = async options => {
  try {
    const source = resolve(options.sourceDir, options.file);
    const target = resolve(
      process.cwd(),
      options.targetDir || '',
      options.file,
    );
    copyFileSync(source, target);
    if (options.command) logSuccess(execSync(options.command).toString());
    return `✓ ${options.file} setup successful`;
  } catch (e) {
    throw new Error(`✖ ${options.file} setup failed: ${e.message}`);
  }
};

exports.run = run;
exports.setup = setup;
