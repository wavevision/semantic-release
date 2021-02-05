#!/usr/bin/env node
'use strict';

const { run: run, setup: setup } = require('../utils/setup');

run(setup(__dirname, '.huskyrc.json', 'yarn husky install'));
