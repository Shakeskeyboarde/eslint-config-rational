import type { ESLint } from 'eslint';
import prettierConfig from 'eslint-config-prettier';
import prettier from 'eslint-plugin-prettier';

import { configFactory } from './utils/config-factory.js';

export default configFactory<{
  readonly files: readonly string[];
}>(({ files }) => {
  return [
    {
      files,
      plugins: {
        prettier,
      },
      rules: {
        ...prettierConfig.rules,
        ...(prettier.configs?.recommended as ESLint.ConfigData).rules,
        'prettier/prettier': 'warn',
      },
    },
  ];
});
