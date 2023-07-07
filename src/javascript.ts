import base from './base.js';
import type { ConfigFactory } from './config-factory.js';
import { jsExtensions } from './constants.js';
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

    {
      files,
      settings: {
        // XXX: Work around for https://github.com/import-js/eslint-plugin-import/issues/2556#issuecomment-1419518561
        'import/parsers': {
          espree: jsExtensions,
        },
        'import/resolver': {
          node: true,
        },
      },
      languageOptions: {
        parserOptions: {
          ecmaVersion: 'latest',
        },
      },
    },
  ];
};

export default factory;
