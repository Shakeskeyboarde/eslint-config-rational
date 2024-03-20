import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort';

import { compat } from '../compat.js';
import { createConfigFactory, type NestedConfigs } from '../config.js';
import { defaultJsExtensions, defaultTsExtensions } from '../defaults.js';

/**
 * ESLint configuration for imports.
 */
export const imports = createConfigFactory<{
  files: string[];
  relaxedFiles: string[];
}>(({ files, relaxedFiles }): NestedConfigs => {
  return [
    // TODO: Update this to flat configuration compatible version when released.
    compat({
      files,
      extends: ['plugin:import/recommended'],
      settings: {
        // XXX: Work around for https://github.com/import-js/eslint-plugin-import/issues/2556#issuecomment-1419518561
        'import/parsers': {
          espree: defaultJsExtensions,
          '@typescript-eslint/parser': defaultTsExtensions,
        },
        'import/resolver': {
          node: true,
          typescript: true,
        },
      },
      rules: {
        'import/extensions': ['error', 'never', {
          ignorePackages: true,
          pattern: { js: 'always' },
        }],
        'import/no-cycle': 'error',
        'import/no-extraneous-dependencies': ['error', { devDependencies: false }],
        'import/no-self-import': 'error',
        'import/no-unresolved': 'error',
      },
    }),

    {
      plugins: {
        'simple-import-sort': simpleImportSortPlugin,
      },
      rules: {
        'simple-import-sort/exports': 'warn',
        'simple-import-sort/imports': 'warn',
      },
    },

    {
      files: relaxedFiles,
      rules: {
        'import/no-extraneous-dependencies': 'off',
        'import/no-named-as-default-member': 'off',
      },
    },
  ];
});
