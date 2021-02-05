#!/usr/bin/env node
'use strict';

const { run, setup } = require('../utils/setup');

const FILE = '.gitconfig';

run(
  setup({
    command: `git config --local include.path ../${FILE}`,
    file: FILE,
    sourceDir: __dirname,
  }),
);
