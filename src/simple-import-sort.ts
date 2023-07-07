import simpleImportSort from 'eslint-plugin-simple-import-sort';

import { configFactory } from './utils/config-factory.js';

export default configFactory<{
  readonly files: readonly string[];
}>(({ files }) => {
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
});
