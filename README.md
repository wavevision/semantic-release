<p align="center"><a href="https://github.com/wavevision"><img alt="Wavevision s.r.o." src="https://wavevision.com/images/wavevision-logo.png" width="120" /></a></p>
<h1 align="center">Semantic Release</h1>

[![QA](https://github.com/wavevision/semantic-release/workflows/QA/badge.svg)](https://github.com/wavevision/semantic-release/actions?query=workflow%3AQA)
[![Release](https://github.com/wavevision/semantic-release/workflows/Release/badge.svg)](https://github.com/wavevision/semantic-release/actions?query=workflow%3ARelease)
[![npm](https://img.shields.io/npm/v/@wavevision/semantic-release)](https://www.npmjs.com/package/@wavevision/semantic-release)

Semantic Release setup for Wavevision apps to maintain conventional commits and releases
using [`gitmoji`](https://gitmoji.dev/). The package contains bootstrap and configs for:

- [`semantic-release`](https://github.com/semantic-release/semantic-release)
- [`semantic-release-gitmoji`](https://github.com/momocow/semantic-release-gitmoji)
- [`@semantic-release/git`](https://github.com/semantic-release/git)
- [`@semantic-release/github`](https://github.com/semantic-release/github)
- [`@semantic-release/gitlab`](https://github.com/semantic-release/gitlab)
- [`@semantic-release/npm`](https://github.com/semantic-release/npm)
- [`commitizen`](https://github.com/commitizen/cz-cli)
- [`commitlint`](https://github.com/conventional-changelog/commitlint)
- [`gitflow-avh`](https://github.com/petervanderdoes/gitflow-avh)
- [`husky`](https://github.com/typicode/husky)

## Installation

```bash
yarn add --dev @wavevision/semantic-release
```

## Usage

First, use setup scripts that come with this package.

- `yarn setup-gitflow` – setup `gitflow-avh` branches
- `yarn setup-husky` – setup `husky` hooks for linting your commit messages

Then, create necessary configs in your project root.

### `release.config.js`

This is the main config for `semantic-release`. Require `makeConfig` function from `@wavevision/semantic-release/config`
to bootstrap your project config. The function accepts single `options` parameter which is an object with following
shape:

```typescript
type Options = {
  config: 'gitlab' | 'github'; // needed to setup correct release plugin
  branches: string[]; // list of branches on which releases should happen
  rules?: {
    // map gitmoji to specific release types
    major?: string[] | { exclude?: string[]; include?: string[] };
    minor?: string[] | { exclude?: string[]; include?: string[] };
    patch?: string[] | { exclude?: string[]; include?: string[] };
  };
  templates?: {
    notes?: string; // release notes .hbs template content
    commit?: string; // commit .hbs template content
  };
  git?: {
    enabled: boolean; // enable @semantic-release/git plugin
    assets?: string[]; // relative paths to assets to be commited with a release
  };
  npm?: {
    enabled: boolean; // enable @semantic-release/npm plugin
  };
};
```

#### Example

```javascript
const makeConfig = require('@wavevision/semantic-release/config');
const {
  CONFIG_GITHUB,
} = require('@wavevision/semantic-release/config/constants');

module.exports = makeConfig({
  config: CONFIG_GITHUB,
  branches: ['master'],
  git: { enabled: true, assets: ['package.json'] },
  npm: { enabled: true },
});
```

This will bootstrap `semantic-release` for GitHub repository in which releases will happen on `master` branch. Each new
release will change `version` property inside `package.json` which will be then committed to the repository. Also, if
your `package.json` **does not** set `private: true`, a `npm` package will be published.

> **Note:** See [this FAQ](https://semantic-release.gitbook.io/semantic-release/support/faq#how-can-i-set-the-access-level-of-the-published-npm-package) to learn about setting `npm` published package access.

The `gitmoji` release rules are by default:

- `major` = `[:boom:]`
- `minor` = `[:sparkles:]`
- `patch` = `[:bug:, :ambulance:, :lock:]`

#### Templates

The package contains a helper to stringify `.hbs` templates content from a folder you define. Use it as follows.

```javascript
const { makeTemplate } = require('@wavevision/semantic-release/config/utils');

const template = makeTemplate('path', 'to', 'templates');
template('notes'); // will return .hbs content from path/to/templates/notes.hbs
```

#### Constants

As shown in the example `@wavevision/semantic-release/config/constants` exports set of useful constants to be used with
the configuration. See all of them in that module.

### `commitlint.config.js`

Simply use the config from this package.

```javascript
module.exports = require('@wavevision/semantic-release/commitlint');
```

### Commit CLI

The package also contains bootstrapped `commitizen` CLI which will help you assemble valid `gitmoji` commit messages
through a simple prompt. Simply run `yarn commit` and follow the steps.

> **Note:** Scope, longer description, breaking change commit body and list of issues closed **are not required**.
