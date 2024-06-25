import eslint from '@eslint/js';
import { type Linter } from 'eslint';

import { flatConfigBuilder } from '../config.js';

interface Options {
  files?: string[];
  supportFiles?: string[];
}

/**
 * ESLint [core rules](https://eslint.org/docs/latest/rules/) configuration.
 */
export default ({ files, supportFiles }: Options = {}): Linter.FlatConfig[] => {
  return flatConfigBuilder()
    // Universal Config
    .use({ ...eslint.configs.recommended, files })
    // Non-Support Config
    .use({
      files,
      ignores: supportFiles,
      rules: {
        'max-lines': ['warn', { max: 300, skipBlankLines: true, skipComments: true }],
        'no-shadow': 'error',
        'no-undef': 'off',
        'no-unused-vars': ['warn', { args: 'after-used' }],
        'no-useless-rename': 'warn',
        'valid-typeof': 'error',
      },
    })
    // Support Config
    .use({
      files: supportFiles,
      rules: {
        'no-empty': 'off',
      },
    })
    .build();
};
