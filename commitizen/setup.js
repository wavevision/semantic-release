#!/usr/bin/env node
'use strict';

const { run, setup } = require('../utils/setup');

run(setup({ file: '.czrc', sourceDir: __dirname }));
