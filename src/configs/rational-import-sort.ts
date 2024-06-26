import { type Linter } from 'eslint';
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort';

import { flatConfigBuilder } from '../config.js';
import { getDefaultJsExtensions, getDefaultTsExtensions, getExtensionFileGlobs } from '../files.js';

export interface ImportSortOptions {
  files?: string[];
}

/**
 * Rational
 * [eslint-plugin-simple-import-sort](https://www.npmjs.com/package/eslint-plugin-simple-import-sort)
 * configuration.
 */
export default ({
  files = getExtensionFileGlobs([...getDefaultJsExtensions(), ...getDefaultTsExtensions()]),
}: ImportSortOptions = {}): Linter.FlatConfig[] => {
  return flatConfigBuilder()
    .use({
      files,
      plugins: {
        'simple-import-sort': simpleImportSortPlugin,
      },
      rules: {
        'simple-import-sort/exports': 'warn',
        'simple-import-sort/imports': 'warn',
      },
    })
    .build();
};
