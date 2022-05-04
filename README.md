# eslint-config-rational

Minimal ESLint configuration for reducing version control noise and avoiding common mistakes.

Inspired by [Canonical ESLint Config](https://www.npmjs.com/package/eslint-config-canonical). This configuration is an attempt at "canonical-lite", providing the same benefits, without having to fight some of the more opinionated rules.

## Tenets

- Produce consistent source code without requiring functional changes.
- Prefer immutability and functional(-ish) coding styles.
- Avoid ambiguous or hard to read code.
- Avoid code patterns which can cause or lead to easy typos.
- Avoid rules which must be disabled in useful scenarios because there are no reasonable alternatives.
- Prefer rules which are auto-fixable.

## Getting Started

Install the `eslint-config-rational` package.

```bash
npm i -D eslint-config-rational eslint
```

You may also want to install `react`, `typescript`, and `prettier` if you intend to use the corresponding configurations.

## Configurations

- `rational` - The base configuration (should be the first `extends` entry).
- `rational/classless` - Disallow classes in favor of functional(-ish) code.
- `rational/react` - Add React support.
- `rational/typescript` - Add Typescript support.
- `rational/warn` - Turn all errors into warnings.
- `rational/prettier` - Add Prettier support (should be the last `extends` entry).

### Typescript

When using `rational/typescript`, you should also set the `parserOptions.project` ESLint configuration value to the relative path of your `tsconfig.json` file. This is required for rules that require type information to work.

### Warn

Using `rational/warn` makes development a little friendlier by not marking up your code with red lines. The assumption is that any problems are temporary and are simply side effects of a work in progress. But, you probably want to use the ESLint `--max-warnings=0` option to fail fast during CI/CD testing.

## Suggested TS+React configuration

```js
module.exports = {
  extends: ['rational', 'rational/react', 'rational/typescript', 'rational/warn', 'rational/prettier'],
  parserOptions: { project: './tsconfig.json' },
  root: true,
};
```

## Suggested full configuration

This configuration is for a TS web project with JS configuration files. If the project is node based and not for the web, just remove the `node: false` environment configuration for `*.ts` and `*.tsx` files.

```js
module.exports = {
  env: { node: true },
  extends: ['rational', 'rational/classless', 'rational/warn', 'rational/prettier'],
  ignorePatterns: ['node_modules', 'lib', 'out', 'dist'],
  overrides: [
    {
      files: ['*.mjs'],
      parserOptions: { sourceType: 'module' },
    },
    {
      files: ['*.js'],
      parserOptions: { sourceType: require('./package.json').type === 'module' ? 'module' : 'script' },
    },
    {
      env: { node: false },
      extends: ['rational', 'rational/classless', 'rational/react', 'rational/typescript', 'rational/warn', 'rational/prettier'],
      files: ['*.ts', '*.tsx'],
      parserOptions: { project: './tsconfig.json' },
    },
  ],
  root: true,
};
```
