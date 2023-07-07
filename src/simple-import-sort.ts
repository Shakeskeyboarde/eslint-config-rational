import simpleImportSort from 'eslint-plugin-simple-import-sort';

import type { ConfigFactory } from './config-factory.js';

const factory: ConfigFactory<{
  readonly files: readonly string[];
}> = ({ files }) => {
  return [
    {
      files,
      plugins: {
        'simple-import-sort': simpleImportSort,
      },
      rules: {
        'simple-import-sort/exports': 'warn',
        'simple-import-sort/imports': 'warn',
      },
    },
  ];
};

export default factory;
