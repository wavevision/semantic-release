const { existsSync } = require('fs');

const mock = require('mock-fs');
const test = require('ava');

const { run, setup } = require('../setup');

const DIR = '/dir';
const FILE = 'file';
const PATH = `${DIR}/${FILE}`;

test.beforeEach(() => {
  mock(
    {
      [PATH]: 'content',
    },
    { createCwd: true, createTmp: false },
  );
});
test.afterEach(mock.restore);

test('run', t => {
  const resolved = async () => 0;
  run(resolved());
  const rejected = async () => {
    throw new Error('error');
  };
  run(rejected());
  t.pass();
});

test('setup', async t => {
  const message = await setup(DIR, FILE, ' ');
  t.is(message, '✓ file setup successful');
  t.true(existsSync(PATH));
  await t.throwsAsync(setup('', '', ''), { instanceOf: Error });
});
