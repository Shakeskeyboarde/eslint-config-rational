# eslint-config-rational

Minimal ESLint configuration for reducing version control noise and avoiding common mistakes.

This is a composite ESLint configuration which includes many different ESLint plugins and rule defaults.

> Note: This is a personal project and may not be suitable for all projects, but feel free to open issues for bugs or suggestions.

- [Getting Started](#getting-started)
- [Config Options](#config-options)
- [Individual Plugin Configs](#individual-plugin-configs)
- [Flat Config Builder](#flat-config-builder)
  - [`flatConfigBuilder()`](#flatconfigbuilder)
  - [`use(configsOrFalsy, ...args?)`](#useconfigsorfalsy-args)
  - [`useLegacy(configOrFalsy)`](#uselegacyconfigorfalsy)
  - [`ignore(...patterns)`](#ignorepatterns)
  - [`build()`](#build)
- [Utilities and Defaults](#utilities-and-defaults)
  - [`getDefaultJsExtensions()`](#getdefaultjsextensions)
  - [`getDefaultTsExtensions()`](#getdefaulttsextensions)
  - [`getExtensionFileGlobs(extensions?)`](#getextensionfileglobsextensions)
  - [`getExtensionDevFileGlobs(extensions?)`](#getextensiondevfileglobsextensions)

## Getting Started

Install the `eslint-config-rational` package and its peer dependencies. 

> Note: Only ESLint v8 is currently supported.

```bash
npm i -D eslint-config-rational eslint@^8 typescript
```

Add the `rational` configuration to your `eslint.config.js` (flat) configuration file. The following example uses the included [FlatConfigBuilder](#flat-config-builder) helper.

```js
import rational, { flatConfigBuilder } from 'eslint-config-rational';

export default flatConfigBuilder()
  .use(rational, { /* option... */ })
  .ignore('**/{lib,dist,out,coverage}')
  .build();
```

Using the builder is optional but recommended. If you don't want to use it, the above configuration is equivalent to the following vanilla flat configuration.

```js
import rational from 'eslint-config-rational';

export default [
  ...rational({ /* options... */ }),
  {
    ignores: ['**/{lib,dist,out,coverage}']
  }
];
```

## Config Options

See the [options interface](src/configs/options.ts) for available options.

## Individual Plugin Configs

Reusable configs for individual plugins are also exported. The following example shows the equivalent of the `rational` composite config with no
options.

```ts
import {
  flatConfigBuilder,
  rationalEslint,
  rationalImportSort,
  rationalImport,
  rationalLanguageOptions,
  rationalReact,
  rationalRegexp,
  rationalStylistic,
  rationalTypescript,
  rationalUnicorn,
} from 'eslint-config-rational';

export default flatConfigBuilder()
  // ESLint recommended config with some modifications.
  .use(rationalEslint)
  // eslint-plugin-simple-import-sort config.
  .use(rationalImportSort)
  // eslint-plugin-import recommended+typescript configs with modifications.
  .use(rationalImport)
  // eslint-plugin-react recommended config with modifications.
  .use(rationalReact)
  // eslint-plugin-regexp recommended config.
  .use(rationalRegexp)
  // eslint-plugin-stylistic recommended config with modifications.
  .use(rationalStylistic)
  // eslint-plugin-typescript recommended+stylistic configs with modifications.
  .use(rationalTypescript)
  // eslint-plugin-unicorn custom config.
  .use(rationalUnicorn)
  // Not plugin specific. Resets ESLint language options (sourceType,
  // ecmaVersion) in case they were overridden. This should be the last plugin
  // added.
  .use(rationalLanguageOptions)
  .build();
```

## Flat Config Builder

The `FlatConfigBuilder` is a fluent helper that allows you to easily compose
multiple plugins and configurations into a single flat configuration.

### `flatConfigBuilder()`

Create a new `FlatConfigBuilder` instance. The builder provides useful helper methods for composition, allows for optional configs by accepting falsy values, and normalizes the final flat configuration.

```ts
export default flatConfigBuilder()
  // Compose flat configs.
  .use(config)
  .use(configFactory, ...args)
  .use([config1, config2])
  .use(enabled && config)
  // Compose legacy configs using an internal ESLint FlatCompat helper.
  .useLegacy(legacyConfig)
  .useLegacy(enabled && legacyConfig)
  // Add global ignores. Each call appends to the list.
  .ignore('**/lib', '**/dist')
  .ignore('**/coverage')
  // Build the final normalized flat configuration.
  .build();
```

> Note: The builder is immutable, so each composition method returns a new builder instance.


### `use(configsOrFalsy, ...args?)`

Add one or more flat configurations to the builder. The first argument can be a single flat config, an array of flat configs, a function that returns one of the previous, or a falsy value to skip adding any configurations.

### `useLegacy(configOrFalsy)`

Add a legacy configuration to the builder. The argument can be a single legacy config or a falsy value to skip adding the legacy configuration. The legacy configuration is converted to a flat configuration using the ESLint [FlatCompat](https://eslint.org/docs/latest/use/configure/migration-guide#using-eslintrc-configs-in-flat-config)
helper.

The legacy config is an `ESLint.Linter.Config`, extended with some additional properties.

```ts
interface LegacyConfig extends ESLint.Linter.Config {
  /**
   * Included file patterns for the resulting flat configurations.
   */
  files?: string[];
  /**
   * Ignored file patterns for the resulting flat configurations.
   */
  ignores?: string[];
  /**
   * Resolve plugins relative to this path. If this is a `file:` URL, it is
   * assumed to be `import.meta.url`, and will be converted to a simple
   * directory path.
   */
  resolvePluginsRelativeTo?: string;
}
```

### `ignore(...patterns)`

Add one or more file patterns to the global ignore list. Each call call appends to the current global ignore list, rather than replacing it completely.

If you want to replace the global ignore list completely, call `use({ ignores: [...] })` instead.

### `build()`

Build the final normalized flat configuration. This method should be called last in the chain.

## Utilities and Defaults

The following utility functions are exported.

### `getDefaultJsExtensions()`

Returns the default JavaScript extensions array.

### `getDefaultTsExtensions()`

Returns the default TypeScript extensions array.

### `getExtensionFileGlobs(extensions?)`

Returns glob patterns matching files with the given extensions, or the default JS and TS extensions if none are given.

### `getExtensionDevFileGlobs(extensions?)`

Returns glob patterns matching _development_ files with the given extensions, or the default JS and TS extensions if none are given.

Development files are tests, config files, and other files that are not included in production. This ESLint configuration uses slightly relaxed rules for development files.
