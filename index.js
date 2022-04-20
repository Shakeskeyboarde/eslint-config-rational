/** @type {import('eslint').Linter.Config} */
module.exports = {
  env: { es2021: true },
  extends: ['eslint:recommended', 'plugin:import/recommended'],
  plugins: ['canonical', 'simple-import-sort', 'functional', 'unicorn'],
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
    'unicorn/consistent-destructuring': 'warn',
    'unicorn/consistent-function-scoping': 'warn',
    'unicorn/error-message': 'warn',
    'unicorn/escape-case': 'warn',
    'unicorn/filename-case': 'warn',
    'unicorn/new-for-builtins': 'warn',
    'unicorn/no-abusive-eslint-disable': 'warn',
    'unicorn/no-array-method-this-argument': 'warn',
    'unicorn/no-hex-escape': 'warn',
    'unicorn/no-instanceof-array': 'warn',
    'unicorn/no-lonely-if': 'warn',
    'unicorn/no-new-array': 'warn',
    'unicorn/no-new-buffer': 'warn',
    'unicorn/no-process-exit': 'warn',
    'unicorn/no-static-only-class': 'warn',
    'unicorn/no-unsafe-regex': 'warn',
    'unicorn/no-unused-properties': 'warn',
    'unicorn/no-zero-fractions': 'warn',
    'unicorn/number-literal-case': 'warn',
    'unicorn/numeric-separators-style': 'warn',
    'unicorn/prefer-export-from': 'warn',
    'unicorn/prefer-negative-index': 'warn',
    'unicorn/prefer-node-protocol': 'warn',
    'unicorn/prefer-number-properties': 'warn',
    'unicorn/prevent-abbreviations': [
      'warn',
      {
        replacements: {
          acc: { accumulator: false, result: true },
          arg: false,
          args: false,
          prop: false,
          props: false,
          str: false,
        },
      },
    ],
    'unicorn/relative-url-style': 'warn',
    'valid-typeof': 'warn',
  },
};
