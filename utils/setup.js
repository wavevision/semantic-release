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
 * @param {string} dir
 * @param {string} file
 * @param {string} command
 * @returns {Promise<string>}
 */
const setup = async (dir, file, command) => {
  try {
    const source = resolve(dir, file);
    const target = resolve(process.cwd(), file);
    copyFileSync(source, target);
    execSync(command);
    return `✓ ${file} setup successful`;
  } catch (e) {
    throw new Error(`✖ ${file} setup failed: ${e.message}`);
  }
};

exports.run = run;
exports.setup = setup;
