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

export default rational();
```

## Options

The `rational(options?)` configuration factory accepts the following options.

- `ignores`: Add ESLint global ignores. Defaults to `['**/node_modules/', '**/lib/', '**/dist/', '**/out/', '**/coverage/']`.
- `jsExtensions`: Array of file extensions to lint as JavaScript. Defaults to `['.js', '.cjs', '.mjs', '.jsx']`.
- `tsExtensions`: Array of file extensions to lint as TypeScript. Defaults to `['.ts', '.cts', '.mts', '.tsx']`.
- `jsxExtensions`: Array of file extensions to lint as JSX. Defaults to `['.jsx', '.tsx']`.
- `relaxedFiles`: Array of file paths to lint with relaxed rules. Defaults to `['**/*.test.*', '**/*.spec.*', '**/*.config.*', '**/*.setup.*', '**/.*rc.*', '**/*.story.*', '**/__*', '**/__*/**', '**/.*', '**/.*/**']`.
- `enableImports`: Enable import rules. Defaults to `true`.
- `enableUnicorn`: Enable unicorn rules. Defaults to `true`.
- `enableReact`: Enable react rules. Defaults to `true`.
- `enableTypescript`: Enable typescript rules. Defaults to `true`.
- `enablePrettier`: Enable prettier rules. Defaults to `true`.
- `extend`: One or more ESLint configurations to extend (nested arrays allowed).
- `override`: One or more ESLint override configurations (nested arrays allowed).

```js
import rational from 'eslint-config-rational';

export default rational({
  ignores: ['node_modules/', 'lib/', 'dist/', 'out/', 'coverage/'],
  jsExtensions: ['.js', '.cjs', '.mjs', '.jsx'],
  tsExtensions: ['.ts', '.cts', '.mts', '.tsx'],
  jsxExtensions: ['.jsx', '.tsx'],
  relaxedFiles: [
    '**/*.test.*',
    '**/*.spec.*',
    '**/*.config.*',
    '**/*.setup.*',
    '**/*.story.*',
    '**/__*.*',
    '**/__*/**',
    '**/.*.*',
    '**/.*/**',
  ],
  enableImports: true,
  enableUnicorn: true,
  enableReact: true,
  enableTypescript: true,
  enablePrettier: true,
  extend: [
    // ESLint configuration or (nested) array of configurations which
    // will precede the rational configuration.
  ],
  override: [
    // ESLint configuration or (nested) array of configurations which
    // will follow the rational configuration.
  ],
});
```
