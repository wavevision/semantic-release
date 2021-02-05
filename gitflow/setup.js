#!/usr/bin/env node
'use strict';

const { run: run, setup: setup } = require('../utils/setup');

const FILE = '.gitconfig';

run(setup(__dirname, FILE, 'git config --local include.path ../' + FILE));
