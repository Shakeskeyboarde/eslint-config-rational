import base from './base.js';
import import_ from './import.js';
import simpleImportSort from './simple-import-sort.js';
import unicorn from './unicorn.js';
import compat from './utils/compat.js';
import { configFactory } from './utils/config-factory.js';

export default configFactory<{
  readonly files: readonly string[];
  readonly relaxedFiles: readonly string[];
}>(({ files, relaxedFiles }) => {
  return [
    ...base({ files, relaxedFiles }),
    ...import_({ files, relaxedFiles }),
    ...simpleImportSort({ files }),
    ...unicorn({ files }),

    // TODO: Update this to flat configuration compatible version when released.
    ...compat({
      files,
      plugins: ['react', 'react-hooks'],
      extends: ['plugin:react/recommended', 'plugin:react/jsx-runtime', 'plugin:react-hooks/recommended'],
    }),

    {
      files,
      settings: {
        react: {
          version: 'detect',
        },
      },
      languageOptions: {
        parserOptions: {
          ecmaVersion: 'latest',
        },
      },
      rules: {
        'react/prop-types': 'off',
        'react/no-unescaped-entities': ['warn', { forbid: ['>', '}'] }],
      },
    },
  ];
});
