import { type Linter } from 'eslint';
import tseslint from 'typescript-eslint';

import { flatConfigBuilder } from '../config.js';

export interface TypescriptOptions {
  files?: string[];
  supportFiles?: string[];
}

/**
 * ESLint configuration for TypeScript.
 */
export default ({ files, supportFiles }: TypescriptOptions = {}): Linter.FlatConfig[] => {
  return flatConfigBuilder()
    .use(tseslint.configs.recommendedTypeChecked.map((config) => ({ ...config, files }) as Linter.FlatConfig))
    .use(tseslint.configs.recommendedTypeChecked.map((config) => ({ ...config, files }) as Linter.FlatConfig))
    // Universal Config
    .use({
      files,
      rules: {
        'no-shadow': 'off',
        'no-undef': 'off',
        'no-unused-vars': 'off',
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
        '@typescript-eslint/no-base-to-string': [
          'warn',
          { ignoredTypeNames: ['Error', 'RegExp', 'URL', 'URLSearchParams', '{}'] },
        ],
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-floating-promises': 'error',
        '@typescript-eslint/no-shadow': 'error',
        '@typescript-eslint/no-this-alias': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/no-unused-vars': ['warn', { args: 'after-used' }],
        '@typescript-eslint/prefer-for-of': 'warn',
        '@typescript-eslint/prefer-reduce-type-parameter': 'warn',
        '@typescript-eslint/prefer-string-starts-ends-with': 'warn',
        '@typescript-eslint/restrict-template-expressions': 'off',
        '@typescript-eslint/return-await': ['warn', 'always'],
        '@typescript-eslint/require-await': 'off',
        '@typescript-eslint/switch-exhaustiveness-check': 'warn',
        '@typescript-eslint/unbound-method': 'off',
      },
      languageOptions: {
        parserOptions: {
          // XXX: Detect relative typescript config instead of setting the
          // `project` option. Required when using typescript project
          // references.
          EXPERIMENTAL_useProjectService: true,
        },
      },
    })
    // Support Config
    .use({
      files: supportFiles,
      rules: {
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
      },
    })
    .build();
};
