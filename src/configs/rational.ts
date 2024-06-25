import { type Linter } from 'eslint';

import { flatConfigBuilder } from '../config.js';
import { getDefaultJsExtensions, getDefaultTsExtensions, getExtensionFileGlobs, getExtensionTestFileGlobs } from '../files.js';
import rationalEslint from './rational-eslint.js';
import rationalImport from './rational-import.js';
import rationalImportSort from './rational-import-sort.js';
import rationalReact from './rational-react.js';
import rationalRegexp from './rational-regexp.js';
import rationalStylistic from './rational-stylistic.js';
import rationalTypescript from './rational-typescript.js';
import rationalUnicorn from './rational-unicorn.js';

/**
 * ESLint configuration factory options.
 */
export interface Options {
  /**
   * Override for what file extensions are considered javascript files.
   */
  jsExtensions?: `.${string}`[];
  /**
   * Override globa for which files are considered javascript files.
   */
  jsFiles?: string[];
  /**
   * Override globs for which files are considered javascript "support" files.
   * Support files are files that are not regular considered source files, like
   * test and configuration files. Rules can generally be slightly relaxed for
   * these files.
   */
  jsSupportFiles?: string[];
  /**
   * Override for what file extensions are considered typescript files.
   */
  tsExtensions?: `.${string}`[];
  /**
   * Override globs for which files are considered typescript files.
   */
  tsFiles?: string[];
  /**
   * Override globs for which files are considered typescript "support" files.
   * Support files are files that are not regular considered source files, like
   * test or configuration files. Rules can generally be slightly relaxed for
   * these files.
   */
  tsSupportFiles?: string[];
  /**
   * Disable or enable plugins. All plugins are enabled by default.
   */
  plugins?: {
    import?: boolean;
    importSort?: boolean;
    react?: boolean;
    regexp?: boolean;
    stylistic?: boolean;
    typescript?: boolean;
    unicorn?: boolean;
  };
}

/**
 * Rational ESLint configurations
 */
export default (options: Options = {}): Linter.FlatConfig[] => {
  const {
    jsExtensions = getDefaultJsExtensions(),
    tsExtensions = getDefaultTsExtensions(),
  } = options ?? {};

  const {
    jsFiles = getExtensionFileGlobs(jsExtensions),
    jsSupportFiles = getExtensionTestFileGlobs(jsExtensions),
    tsFiles = getExtensionFileGlobs(tsExtensions),
    tsSupportFiles = getExtensionTestFileGlobs(tsExtensions),
  } = options ?? {};

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
    })
    .use(plugins?.importSort !== false && rationalImportSort, {
      files,
    })
    .use(plugins?.react !== false && rationalReact, {
      files,
    })
    .use(plugins?.regexp !== false && rationalRegexp, {
      files,
    })
    .use(plugins?.stylistic !== false && rationalStylistic, {
      files,
    })
    .use(plugins?.typescript !== false && rationalTypescript, {
      files: tsFiles,
      supportFiles: tsSupportFiles,
    })
    .use(plugins?.unicorn !== false && rationalUnicorn, {
      files,
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
