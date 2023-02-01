/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ['plugin:import/typescript', 'plugin:@typescript-eslint/recommended'],
  overrides: [
    {
      files: ['*.test.*'],
      rules: {
        '@typescript-eslint/no-empty-function': 'off',
        'functional/prefer-readonly-type': 'off',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['functional'],
  rules: {
    'no-shadow': 'off',
    'no-unused-vars': 'off',
    'import/extensions': 'off',
    '@typescript-eslint/array-type': 'warn',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/consistent-type-imports': ['warn', { fixStyle: 'inline-type-imports' }],
    '@typescript-eslint/consistent-type-exports': ['warn', { fixMixedExportsWithInlineTypeSpecifier: true }],
    '@typescript-eslint/method-signature-style': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-floating-promises': 'warn',
    '@typescript-eslint/no-shadow': 'warn',
    '@typescript-eslint/no-unused-vars': ['warn', { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],
    '@typescript-eslint/prefer-for-of': 'warn',
    '@typescript-eslint/prefer-reduce-type-parameter': 'warn',
    '@typescript-eslint/prefer-string-starts-ends-with': 'warn',
    '@typescript-eslint/sort-type-union-intersection-members': 'warn',
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {},
    },
  },
};
