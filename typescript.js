/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:typescript-sort-keys/recommended',
  ],
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
  plugins: ['canonical', 'functional'],
  rules: {
    '@typescript-eslint/array-type': 'warn',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/consistent-type-definitions': ['warn', 'type'],
    '@typescript-eslint/consistent-type-imports': 'warn',
    '@typescript-eslint/method-signature-style': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-floating-promises': 'warn',
    '@typescript-eslint/no-shadow': 'warn',
    '@typescript-eslint/prefer-for-of': 'warn',
    '@typescript-eslint/prefer-reduce-type-parameter': 'warn',
    '@typescript-eslint/prefer-string-starts-ends-with': 'warn',
    '@typescript-eslint/sort-type-union-intersection-members': 'warn',
    'canonical/prefer-inline-type-import': 'warn',
    'functional/prefer-readonly-type': [
      'warn',
      { allowLocalMutation: true, allowMutableReturnType: true, ignorePattern: '^_+' },
    ],
    'no-shadow': 'off',
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
