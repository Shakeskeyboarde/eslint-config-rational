import eslint from '@eslint/js';

import { configFactory } from './utils/config-factory.js';

export default configFactory<{
  readonly files: readonly string[];
  readonly relaxedFiles: readonly string[];
}>(({ files, relaxedFiles }) => {
  return [
    {
      files,
      ...eslint.configs.recommended,
    },

    {
      files,
      rules: {
        'func-style': 'warn',
        'max-lines': ['warn', { max: 200, skipBlankLines: true, skipComments: true }],
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
        'no-shadow': 'error',
        'no-unused-vars': ['warn', { varsIgnorePattern: '^_.*ignore.*', args: 'after-used' }],
        'no-useless-rename': 'warn',
        'valid-typeof': 'error',
      },
    },

    {
      files: relaxedFiles,
      rules: {
        'max-lines': 'off',
        'no-empty': 'off',
      },
    },
  ];
});
