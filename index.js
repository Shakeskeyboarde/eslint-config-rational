/** @type {import('eslint').Linter.Config} */
/* eslint-disable unicorn/prevent-abbreviations */
module.exports = {
  env: { es2021: true },
  extends: ['eslint:recommended', 'plugin:import/recommended', 'plugin:destructure-object/recommended'],
  overrides: [
    {
      files: ['*.test.*'],
      rules: {
        'max-lines': ['warn', { max: 300, skipBlankLines: true, skipComments: true }],
      },
    },
  ],
  plugins: ['canonical', 'simple-import-sort', 'unicorn'],
  rules: {
    'canonical/sort-keys': 'warn',
    'destructure-object/no-rename': 'off',
    'func-style': 'warn',
    'import/exports-last': 'warn',
    'import/extensions': ['warn', 'ignorePackages'],
    'import/group-exports': 'warn',
    'import/no-cycle': 'warn',
    'import/no-default-export': 'warn',
    'import/no-extraneous-dependencies': [
      'warn',
      {
        devDependencies: [
          '**/*.test.*',
          '**/*.spec.*',
          '**/*.config.*',
          '**/*.setup.*',
          '**/.*rc.*',
          '**/*.story.*',
          '**/__*',
          '**/__*/**',
          '**/.*',
          '**/.*/**',
        ],
      },
    ],
    'import/no-self-import': 'warn',
    'import/no-unresolved': 'off',
    'import/order': 'off',
    'import/prefer-default-export': 'off',
    'max-lines': ['warn', { max: 150, skipBlankLines: true, skipComments: true }],
    'no-restricted-syntax': [
      'error',
      {
        message: 'Exports with leading underscores are not allowed.',
        selector: 'ExportNamedDeclaration > ExportSpecifier[exported.name=/^_.*/]',
      },
      {
        message: 'Exporting locals with leading underscores is not allowed.',
        selector: 'ExportNamedDeclaration > ExportSpecifier[local.name=/^_.*/]',
      },
      {
        message: 'Exporting variables with leading underscores is not allowed.',
        selector: 'ExportNamedDeclaration > VariableDeclaration > VariableDeclarator[id.name=/^_.*/]',
      },
      {
        message: 'Exporting types with leading underscores is not allowed.',
        selector: 'ExportNamedDeclaration > [id.name=/^_.*/]',
      },
    ],
    'no-shadow': 'warn',
    'no-useless-rename': 'warn',
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
    'unicorn/no-lonely-if': 'warn',
    'unicorn/no-new-array': 'warn',
    'unicorn/no-new-buffer': 'warn',
    'unicorn/no-process-exit': 'warn',
    'unicorn/no-static-only-class': 'warn',
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
        checkFilenames: false,
        ignore: ['^_*(?:assert|create|get|set|has|remove|on|is|finalize)?[A-Z]'],
        replacements: {
          acc: { accumulator: false, result: true },
          accumulator: { result: true },
          arg: false,
          args: false,
          argument: { arg: true },
          arguments: { args: true },
          ctx: false,
          dir: false,
          env: false,
          err: false,
          fn: false,
          i: false,
          param: false,
          parameter: { param: true },
          parameters: { params: true },
          params: false,
          pkg: false,
          prop: false,
          properties: { props: true },
          property: { prop: true },
          props: false,
          ref: false,
          reference: { ref: true },
          req: false,
          request: { req: true },
          res: false,
          response: { res: true },
          std: { standard: true },
          str: false,
        },
      },
    ],
    'unicorn/relative-url-style': 'warn',
    'valid-typeof': 'warn',
  },
};
