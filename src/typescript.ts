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
      plugins: ['@typescript-eslint'],
      extends: [
        'plugin:import/typescript',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
    }),

    {
      files,
      languageOptions: {
        parserOptions: {
          ecmaVersion: 'latest',
          sourceType: 'module',
          project: './tsconfig.json',
        },
      },
      rules: {
        'no-shadow': 'off',
        'no-unused-vars': 'off',
        'import/extensions': 'off',
        'import/no-unresolved': 'off',
        '@typescript-eslint/array-type': 'warn',
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/consistent-type-imports': ['warn', { fixStyle: 'inline-type-imports' }],
        '@typescript-eslint/consistent-type-exports': ['warn', { fixMixedExportsWithInlineTypeSpecifier: true }],
        '@typescript-eslint/explicit-function-return-type': [
          'warn',
          {
            allowExpressions: true,
            allowTypedFunctionExpressions: true,
            allowHigherOrderFunctions: true,
            allowDirectConstAssertionInArrowFunctions: true,
            allowConciseArrowFunctionExpressionsStartingWithVoid: true,
          },
        ],
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-floating-promises': 'warn',
        '@typescript-eslint/no-shadow': 'warn',
        '@typescript-eslint/no-unused-vars': ['warn', { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],
        '@typescript-eslint/prefer-for-of': 'warn',
        '@typescript-eslint/prefer-reduce-type-parameter': 'warn',
        '@typescript-eslint/prefer-string-starts-ends-with': 'warn',
        '@typescript-eslint/return-await': ['warn', 'always'],
        '@typescript-eslint/switch-exhaustiveness-check': 'warn',
        '@typescript-eslint/unbound-method': 'off',
      },
    },

    {
      files: relaxedFiles,
      rules: {
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
      },
    },
  ];
});
