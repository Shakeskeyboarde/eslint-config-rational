import simpleImportSort from 'eslint-plugin-simple-import-sort';

import compat from './utils/compat.js';
import { configFactory } from './utils/config.js';
import { jsExtensions, tsExtensions } from './utils/constants.js';

export default configFactory<{
  readonly files: readonly string[];
  readonly relaxedFiles: readonly string[];
}>(({ files, relaxedFiles }) => {
  return [
    // TODO: Update this to flat configuration compatible version when released.
    compat({
      files,
      extends: ['plugin:import/recommended'],
      settings: {
        // XXX: Work around for https://github.com/import-js/eslint-plugin-import/issues/2556#issuecomment-1419518561
        'import/parsers': {
          espree: jsExtensions,
          '@typescript-eslint/parser': tsExtensions,
        },
        'import/resolver': {
          node: true,
          typescript: true,
        },
      },
      rules: {
        'import/extensions': ['error', 'never', { ignorePackages: true, pattern: { js: 'always' } }],
        'import/no-cycle': 'error',
        'import/no-extraneous-dependencies': ['warn', { devDependencies: false }],
        'import/no-self-import': 'error',
        'import/no-unresolved': 'error',
      },
    }),

    {
      plugins: {
        'simple-import-sort': simpleImportSort,
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
