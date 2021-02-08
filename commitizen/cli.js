#!/usr/bin/env node
'use strict';

const { resolve } = require('path');

const { bootstrap } = require('commitizen/dist/cli/git-cz');

bootstrap({
  cliPath: resolve(process.cwd(), 'node_modules', 'commitizen'),
  config: {
    path: 'cz-emoji',
  },
});
