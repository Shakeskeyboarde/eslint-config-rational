import { compat } from '../compat.js';
import { createConfigFactory, type NestedConfigs } from '../config.js';

/**
 * ESLint configuration for `eslint-plugin-regexp`.
 */
export const regexp = createConfigFactory<{
  files: string[];
}>(({ files }): NestedConfigs => {
  return [
    compat({
      files,
      extends: ['plugin:regexp/recommended'],
      rules: {
        'require-unicode-regexp': 'warn',
      },
    }),
  ];
});
