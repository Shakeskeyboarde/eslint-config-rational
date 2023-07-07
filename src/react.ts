import base from './base.js';
import compat from './compat.js';
import type { ConfigFactory } from './config-factory.js';
import import_ from './import.js';
import simpleImportSort from './simple-import-sort.js';
import unicorn from './unicorn.js';

const factory: ConfigFactory<{
  readonly extensions: readonly string[];
  readonly relaxedFiles: readonly string[];
}> = ({ extensions, relaxedFiles }) => {
  const files = extensions.map((ext) => `**/*${ext}`);

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
        }
      },
      rules: {
        'react/prop-types': 'off',
        'react/no-unescaped-entities': ['warn', { forbid: ['>', '}'] }],
      },
    },
  ];
};

export default factory;
