import eslint from '@eslint/js';

import { createConfigFactory, type NestedConfigs } from '../config.js';

/**
 * Base ESLint configuration.
 */
export const base = createConfigFactory<{
  files: string[];
  relaxedFiles: string[];
}>(({ files, relaxedFiles }): NestedConfigs => {
  return [
    Object.assign({ files }, eslint.configs.recommended),
    {
      files,
      rules: {
        'func-style': 'warn',
        'max-lines': ['warn', { max: 300, skipBlankLines: true, skipComments: true }],
        'no-shadow': 'error',
        'no-unused-vars': ['warn', { args: 'after-used' }],
        'no-useless-rename': 'warn',
        'valid-typeof': 'error',
      },
    },

    {
      files: relaxedFiles,
      rules: {
        'max-lines': 'off',
        'no-empty': 'off',
        'no-unused-vars': 'off',
      },
    },
  ];
});
