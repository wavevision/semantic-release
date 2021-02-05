#!/usr/bin/env node
'use strict';

const { run, setup } = require('../utils/setup');

run(setup(__dirname, '.huskyrc.json', 'yarn husky install'));
