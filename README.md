# eslint-config-rational

Minimal ESLint configuration for reducing version control noise and avoiding common mistakes.

## Tenets

- Prevent code patterns which frequently cause or lead to bugs.
- Produce consistent source code without requiring functional changes.
- Prefer rules which are auto-fixable.
- Avoid rules which require frequent inline disabling.
- Avoid rules which are already covered by TypeScript.

## Getting Started

Install the `eslint-config-rational` package.

```bash
npm i -D eslint-config-rational eslint prettier typescript
```

Add the `rational` configuration to your `eslint.config.js` (flat) configuration file.

```js
import rational from 'eslint-config-rational';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  // Returns an array of ESLint FlatConfig objects.
  ...rational(),
];
```

## Options

The `rational(options?)` configuration factory accepts the following options.

- `jsExtensions`: Array of file extensions to lint as JavaScript. Defaults to `['.js', '.cjs', '.mjs', '.jsx']`.
- `tsExtensions`: Array of file extensions to lint as TypeScript. Defaults to `['.ts', '.cts', '.mts', '.tsx']`.
- `jsxExtensions`: Array of file extensions to lint as JSX. Defaults to `['.jsx', '.tsx']`.
- `relaxedFiles`: Array of file paths to lint with relaxed rules. Defaults to `['**/*.test.*', '**/*.spec.*', '**/*.config.*', '**/*.setup.*', '**/.*rc.*', '**/*.story.*', '**/__*', '**/__*/**', '**/.*', '**/.*/**']`.
