import { type Linter } from 'eslint';

import { flatConfigBuilder } from '../config.js';
import { getDefaultJsExtensions, getDefaultTsExtensions, getExtensionDevFileGlobs, getExtensionFileGlobs } from '../files.js';
import { type Options } from './options.js';
import rationalEslint from './rational-eslint.js';
import rationalImport from './rational-import.js';
import rationalImportSort from './rational-import-sort.js';
import rationalLanguageOptions from './rational-language-options.js';
import rationalReact from './rational-react.js';
import rationalReactHooks from './rational-react-hooks.js';
import rationalRegexp from './rational-regexp.js';
import rationalStylistic from './rational-stylistic.js';
import rationalTypescript from './rational-typescript.js';
import rationalUnicorn from './rational-unicorn.js';

/**
 * Rational ESLint configurations
 */
export default (options: Options = {}): Linter.FlatConfig[] => {
  const jsExtensions = typeof options.jsExtensions === 'function'
    ? options.jsExtensions(getDefaultJsExtensions())
    : options.jsExtensions ?? getDefaultJsExtensions();
  const jsFiles = typeof options.jsFiles === 'function'
    ? options.jsFiles(getExtensionFileGlobs(jsExtensions))
    : options.jsFiles ?? getExtensionFileGlobs(jsExtensions);
  const jsDevFiles = typeof options.jsDevFiles === 'function'
    ? options.jsDevFiles(getExtensionDevFileGlobs(jsExtensions))
    : options.jsDevFiles ?? getExtensionDevFileGlobs(jsExtensions);
  const tsExtensions = typeof options.tsExtensions === 'function'
    ? options.tsExtensions(getDefaultTsExtensions())
    : options.tsExtensions ?? getDefaultTsExtensions();
  const tsFiles = typeof options.tsFiles === 'function'
    ? options.tsFiles(getExtensionFileGlobs(tsExtensions))
    : options.tsFiles ?? getExtensionFileGlobs(tsExtensions);
  const tsDevFiles = typeof options.tsDevFiles === 'function'
    ? options.tsDevFiles(getExtensionDevFileGlobs(tsExtensions))
    : options.tsDevFiles ?? getExtensionDevFileGlobs(tsExtensions);
  const reactExtensions = typeof options.reactExtensions === 'function'
    ? options.reactExtensions([...jsExtensions, ...tsExtensions].filter((file) => file.endsWith('x')))
    : options.reactExtensions ?? [...jsExtensions, ...tsExtensions].filter((file) => file.endsWith('x'));
  const reactFiles = typeof options.reactFiles === 'function'
    ? options.reactFiles(getExtensionFileGlobs(reactExtensions))
    : options.reactFiles ?? getExtensionFileGlobs(reactExtensions);

  const files = [...jsFiles, ...tsFiles];
  const devFiles = [...jsDevFiles, ...tsDevFiles];
  const plugins = options.plugins ?? {};
  const useTypescript = plugins.typescript !== false;

  return flatConfigBuilder()
    .use(rationalEslint, {
      files,
      devFiles,
    })
    .use(plugins?.import !== false && rationalImport, {
      files,
      devFiles: devFiles,
      jsExtensions,
      tsExtensions,
      useTypescript,
      ...(typeof plugins?.import === 'object' ? plugins.import : {}),
    })
    .use(plugins?.importSort !== false && rationalImportSort, {
      files,
      ...(typeof plugins?.importSort === 'object' ? plugins.importSort : {}),
    })
    .use(plugins?.react !== false && rationalReact, {
      files: reactFiles,
      ...(typeof plugins?.react === 'object' ? plugins.react : {}),
    })
    .use(plugins?.reactHooks !== false && rationalReactHooks, {
      files: reactFiles,
      ...(typeof plugins?.reactHooks === 'object' ? plugins.reactHooks : {}),
    })
    .use(plugins?.regexp !== false && rationalRegexp, {
      files,
      ...(typeof plugins?.regexp === 'object' ? plugins.regexp : {}),
    })
    .use(plugins?.stylistic !== false && rationalStylistic, {
      files,
      ...(typeof plugins?.stylistic === 'object' ? plugins.stylistic : {}),
    })
    .use(plugins?.typescript !== false && rationalTypescript, {
      files: tsFiles,
      devFiles: tsDevFiles,
      ...(typeof plugins?.typescript === 'object' ? plugins.typescript : {}),
    })
    .use(plugins?.unicorn !== false && rationalUnicorn, {
      files,
      ...(typeof plugins?.unicorn === 'object' ? plugins.unicorn : {}),
    })
    .use(rationalLanguageOptions)
    .build();
};
