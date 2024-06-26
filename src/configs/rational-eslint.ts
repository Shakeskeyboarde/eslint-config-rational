import eslint from '@eslint/js';
import { type Linter } from 'eslint';

import { flatConfigBuilder } from '../config.js';
import { getDefaultJsExtensions, getDefaultTsExtensions, getExtensionDevFileGlobs, getExtensionFileGlobs } from '../files.js';

export interface EslintOptions {
  files?: string[];
  devFiles?: string[];
}

/**
 * ESLint [core rules](https://eslint.org/docs/latest/rules/) configuration.
 */
export default ({
  files = getExtensionFileGlobs([...getDefaultJsExtensions(), ...getDefaultTsExtensions()]),
  devFiles = getExtensionDevFileGlobs([...getDefaultJsExtensions(), ...getDefaultTsExtensions()]),
}: EslintOptions = {}): Linter.FlatConfig[] => {
  return flatConfigBuilder()
    // Universal Config
    .use({ ...eslint.configs.recommended, files })
    // Prod Config
    .use({
      files,
      ignores: devFiles,
      rules: {
        'max-lines': ['warn', { max: 300, skipBlankLines: true, skipComments: true }],
        'no-shadow': 'error',
        'no-undef': 'off',
        'no-unused-vars': ['warn', { args: 'after-used' }],
        'no-useless-rename': 'warn',
        'valid-typeof': 'error',
      },
    })
    // Dev Config
    .use({
      files: devFiles,
      rules: {
        'no-empty': 'off',
      },
    })
    .build();
};
