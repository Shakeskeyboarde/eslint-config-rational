# eslint-config-rational

Minimal ESLint configuration for reducing version control noise and avoiding common mistakes.

This is a composite ESLint configuration which includes many different ESLint plugins and rule defaults.

> Note: This is a personal project and may not be suitable for all projects, but feel free to open issues for bugs or suggestions.
## Getting Started

Install the `eslint-config-rational` package and its peer dependencies. 

> Note: Only ESLint v8 is currently supported.

```bash
npm i -D eslint-config-rational eslint@^8 typescript
```

Add the `rational` configuration to your `eslint.config.js` (flat) configuration file.

```js
import rational, { flatConfigBuilder } from 'eslint-config-rational';

export default flatConfigBuilder()
  .use(rational)
  .ignore('**/{lib,dist,out,coverage}')
  .build();
```

Using the `FlatConfigBuilder` is optional but recommended. If you don't want to use it, the above configuration is equivalent to the following vanilla flat configuration.

```js
import rational from 'eslint-config-rational';

export default [
  ...rational(),
  {
    ignores: ['**/{lib,dist,out,coverage}']
  }
];
```

## Options

Use options to configure TS/JS file extensions, included files, and which of the underlying ESLint plugins are enabled.

```js
import rational, { flatConfigBuilder } from 'eslint-config-rational';

export default flatConfigBuilder()
  .use(rational, {
    // JavaScript
    jsExtensions: [...],
    jsFiles: [...],
    jsSupportFiles: [...],
    // TypeScript
    tsExtensions: [...],
    tsFiles: [...],
    tsSupportFiles: [...],
    // React
    reactExtensions: [...],
    reactFiles: [...],
    // Plugins
    plugins: {
      import: true;
      importSort: true;
      react: true;
      regexp: true;
      stylistic: true;
      typescript: true;
      unicorn: true;
    }
  })
  .ignore(...)
  .build();
```
