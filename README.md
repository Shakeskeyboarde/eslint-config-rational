# eslint-config-rational

Minimal ESLint configuration for reducing version control noise and avoiding common mistakes.

Inspired by [Canonical ESLint Config](https://www.npmjs.com/package/eslint-config-canonical). This configuration is an attempt at "canonical-lite", providing the same benefits, without having to fight some of the more opinionated rules.

## Tenets

- Prevent code patterns which frequently cause or lead to bugs.
- Produce consistent source code without requiring functional changes.
- Prefer immutability and functional(-ish) coding styles.
- Prefer rules which are auto-fixable.
- Avoid rules which require frequent inline disabling.
- Avoid rules which are already covered by TypeScript.

## Getting Started

Install the `eslint-config-rational` package.

```bash
npm i -D eslint-config-rational eslint
```

You may also want to install `react` and `typescript` if you intend to use the corresponding configurations.

## Configurations

- `rational` - The base configuration (should be the first `extends` entry).
- `rational/functional` - Require functional(-ish) code.
- `rational/react` - Add React support.
- `rational/typescript` - Add TypeScript support.
- `rational/warn` - Turn all errors into warnings.

### TypeScript

When using `rational/typescript`, you should also set the `parserOptions.project` ESLint configuration value to the relative path of your `tsconfig.json` file. This is required for rules that require type information to work.

### Warn

Using `rational/warn` makes development a little friendlier by not marking up your code with red lines. The assumption is that any problems are temporary and are simply side effects of a work in progress. But, you probably want to use the ESLint `--max-warnings=0` option to fail fast during CI/CD testing.

## Suggested TS+React configuration

```js
module.exports = {
  extends: ['rational', 'rational/react', 'rational/typescript', 'rational/warn'],
  parserOptions: { project: './tsconfig.json' },
  root: true,
};
```

## Suggested full configuration

This configuration is for a TS web project with JS configuration files. If the project is node based and not for the web, just remove the `node: false` environment configuration for `*.ts` and `*.tsx` files.

```js
module.exports = {
  env: { node: true },
  extends: ['rational', 'rational/warn'],
  ignorePatterns: ['node_modules', 'lib', 'out', 'dist'],
  overrides: [
    {
      files: ['*.cjs'],
      parserOptions: { sourceType: 'script' },
    },
    {
      files: ['*.mjs'],
      parserOptions: { sourceType: 'module' },
    },
    {
      files: ['*.js'],
      parserOptions: { sourceType: require('./package.json').type === 'module' ? 'module' : 'script' },
    },
    {
      extends: ['rational/react'],
      files: ['*.jsx', '*.tsx'],
    },
    {
      extends: ['rational/typescript'],
      files: ['*.ts', '*.tsx'],
      parserOptions: { project: './tsconfig.json' },
    },
  ],
  root: true,
};
```
