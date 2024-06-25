import { type Linter } from 'eslint';
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort';

import { flatConfigBuilder } from '../config.js';

interface Options {
  files?: string[];
}

/**
 * Rational
 * [eslint-plugin-simple-import-sort](https://www.npmjs.com/package/eslint-plugin-simple-import-sort)
 * configuration.
 */
export default ({
  files,
}: Options = {}): Linter.FlatConfig[] => {
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
