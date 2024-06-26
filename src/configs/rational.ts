import { type Linter } from 'eslint';

import { flatConfigBuilder } from '../config.js';
import { getDefaultJsExtensions, getDefaultTsExtensions, getExtensionFileGlobs, getExtensionTestFileGlobs } from '../files.js';
import rationalEslint from './rational-eslint.js';
import rationalImport, { type ImportOptions } from './rational-import.js';
import rationalImportSort, { type ImportSortOptions } from './rational-import-sort.js';
import rationalReact, { type ReactOptions } from './rational-react.js';
import rationalRegexp, { type RegexpOptions } from './rational-regexp.js';
import rationalStylistic, { type StylisticOptions } from './rational-stylistic.js';
import rationalTypescript, { type TypescriptOptions } from './rational-typescript.js';
import rationalUnicorn, { type UnicornOptions } from './rational-unicorn.js';

/**
 * ESLint configuration factory options.
 */
export interface Options {
  /**
   * Override for what file extensions are considered javascript files.
   */
  jsExtensions?: `.${string}`[];
  /**
   * Override globa for which files are considered javascript files. Defaults
   * to globs derived from `jsExtensions`.
   */
  jsFiles?: string[];
  /**
   * Override globs for which files are considered javascript "support" files.
   * Support files are files that are not regular considered source files, like
   * test and configuration files. Rules can generally be slightly relaxed for
   * these files. Defaults to globs derived from `jsExtensions`.
   */
  jsSupportFiles?: string[];
  /**
   * Override for what file extensions are considered typescript files.
   */
  tsExtensions?: `.${string}`[];
  /**
   * Override globs for which files are considered typescript files. Defaults
   * to globs derived from `tsExtensions`.
   */
  tsFiles?: string[];
  /**
   * Override globs for which files are considered typescript "support" files.
   * Support files are files that are not regular considered source files, like
   * test or configuration files. Rules can generally be slightly relaxed for
   * these files. Defaults to globs derived from `tsExtensions`.
   */
  tsSupportFiles?: string[];
  /**
   * Override for what file extensions are considered react files. Defaults to
   * globs derived from `jsExtensions` and `tsExtensions` where the extension
   * ends with an `x`
   */
  reactExtensions?: `.${string}`[];
  /**
   * Override globs for which files are considered react files. Defaults to
   * globs derived from `reactExtensions`.
   */
  reactFiles?: string[];
  /**
   * Disable or enable plugins. All plugins are enabled by default.
   */
  plugins?: {
    import?: boolean | ImportOptions;
    importSort?: boolean | ImportSortOptions;
    react?: boolean | ReactOptions;
    regexp?: boolean | RegexpOptions;
    stylistic?: boolean | StylisticOptions;
    typescript?: boolean | TypescriptOptions;
    unicorn?: boolean | UnicornOptions;
  };
}

/**
 * Rational ESLint configurations
 */
export default (options: Options = {}): Linter.FlatConfig[] => {
  const {
    jsExtensions = getDefaultJsExtensions(),
    jsFiles = getExtensionFileGlobs(jsExtensions),
    jsSupportFiles = getExtensionTestFileGlobs(jsExtensions),
    tsExtensions = getDefaultTsExtensions(),
    tsFiles = getExtensionFileGlobs(tsExtensions),
    tsSupportFiles = getExtensionTestFileGlobs(tsExtensions),
    reactExtensions = [...jsExtensions, ...tsExtensions].filter((file) => file.endsWith('x')),
    reactFiles = getExtensionFileGlobs(reactExtensions),
  } = options;

  const files = [...jsFiles, ...tsFiles];
  const supportFiles = [...jsSupportFiles, ...tsSupportFiles];
  const plugins = options.plugins ?? {};
  const useTypescript = plugins.typescript !== false;

  return flatConfigBuilder()
    .use(rationalEslint, {
      files,
      supportFiles,
    })
    .use(plugins?.import !== false && rationalImport, {
      files,
      supportFiles,
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
      supportFiles: tsSupportFiles,
      ...(typeof plugins?.typescript === 'object' ? plugins.typescript : {}),
    })
    .use(plugins?.unicorn !== false && rationalUnicorn, {
      files,
      ...(typeof plugins?.unicorn === 'object' ? plugins.unicorn : {}),
    })
    // Normalize parser options that might have been set by other
    // configurations.
    .use({
      languageOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
        parserOptions: {
          // XXX: https://typescript-eslint.io/packages/parser/#experimental_useprojectservice
          EXPERIMENTAL_useProjectService: true,
          sourceType: 'module',
          ecmaVersion: 'latest',
        },
      },
    })
    .build();
};
