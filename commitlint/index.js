module.exports = {
  extends: ['gitmoji'],
  parserPreset: {
    parserOpts: {
      headerCorrespondence: ['subject', 'ticket'],
      headerPattern: /^(?::\w*:\s)(?<subject>(?:(?!#).)*(?:(?!\s).))\s?(?<ticket>#\d*)?$/,
    },
  },
  rules: {
    'scope-empty': [0, 'never'],
    'subject-case': [2, 'always', 'sentence-case'],
    'type-empty': [0, 'never'],
  },
};
