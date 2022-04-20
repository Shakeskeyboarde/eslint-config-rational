/** @type {import('eslint').Linter.Config} */
module.exports = {
  env: { es2021: true },
  extends: ['eslint:recommended', 'plugin:import/recommended'],
  plugins: ['canonical', 'simple-import-sort', 'functional'],
  rules: {
    'canonical/sort-keys': 'warn',
    'func-style': 'warn',
    'functional/no-class': 'warn',
    'functional/no-this-expression': 'warn',
    'functional/prefer-tacit': 'warn',
    'import/exports-last': 'warn',
    'import/group-exports': 'warn',
    'import/no-default-export': 'warn',
    'import/no-extraneous-dependencies': [
      'warn',
      {
        devDependencies: [
          '**/*.test.*',
          '**/*.spec.*',
          '**/*.config.*',
          '**/.*rc.*',
          '**/*.story.*',
          '**/__*/**',
          '**/.*/**',
        ],
      },
    ],
    'import/order': 'off',
    'import/prefer-default-export': 'off',
    'simple-import-sort/exports': 'warn',
    'simple-import-sort/imports': 'warn',
    'valid-typeof': 'warn',
  },
};
