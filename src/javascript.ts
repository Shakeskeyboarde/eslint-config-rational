import base from './base.js';
import import_ from './import.js';
import simpleImportSort from './simple-import-sort.js';
import unicorn from './unicorn.js';
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

    {
      files,
      languageOptions: {
        parserOptions: {
          ecmaVersion: 'latest',
        },
      },
    },
  ];
});
