#!/usr/bin/env node
'use strict';

const { run, setup } = require('../utils/setup');

run(
  setup({
    command: 'yarn husky install',
    file: 'commit-msg',
    sourceDir: __dirname,
    targetDir: '.husky',
  }),
);
