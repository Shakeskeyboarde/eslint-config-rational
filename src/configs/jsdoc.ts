import jsdocPlugin from 'eslint-plugin-jsdoc';

import { createConfigFactory, type NestedConfigs } from '../config.js';

const EXPORT = ':matches(ExportDefaultDeclaration, ExportNamedDeclaration[source=null])';
const EXPORT_CLASS = `${EXPORT} > ClassDeclaration > ClassBody`;
const EXPORT_INTERFACE = `${EXPORT} > TSInterfaceDeclaration > TSInterfaceBody`;
const NOT_PRIVATE = ':not([accessibility="private"], [key.type="PrivateIdentifier"])';

/**
 * ESLint configuration for `eslint-plugin-jsdoc`.
 */
export const jsdoc = createConfigFactory<{
  files: string[];
  relaxedFiles: string[];
}>(({ files, relaxedFiles }): NestedConfigs => {
  return [
    {
      files,
      ignores: ['*.d.ts'],
      plugins: { jsdoc: jsdocPlugin },
      rules: {
        'jsdoc/require-jsdoc': ['warn', {
        // Disable all the default checks. We're going to use our own custom
        // context selectors.
          require: {
            ArrowFunctionExpression: false,
            ClassDeclaration: false,
            ClassExpression: false,
            FunctionDeclaration: false,
            FunctionExpression: false,
            MethodDefinition: false,
          },
          contexts: [
            `${EXPORT}[declaration.type="VariableDeclaration"]`,
            `${EXPORT}[declaration.type="ClassDeclaration"]`,
            `${EXPORT}[declaration.type="FunctionDeclaration"]`,
            `${EXPORT}[declaration.type="ArrowFunctionExpression"]`,
            `${EXPORT}[declaration.type="TSInterfaceDeclaration"]`,
            `${EXPORT}[declaration.type="TSTypeAliasDeclaration"]`,
            `${EXPORT}[declaration.type="TSEnumDeclaration"]`,
            `${EXPORT_CLASS} > PropertyDefinition${NOT_PRIVATE}`,
            `${EXPORT_CLASS} > MethodDefinition[value.type="TSEmptyBodyFunctionExpression"]${NOT_PRIVATE}`,
            `${EXPORT_CLASS} > MethodDefinition:not([value.type="TSEmptyBodyFunctionExpression"] + *, [key.name="constructor"])${NOT_PRIVATE}`,
            `${EXPORT_INTERFACE} > TSPropertySignature`,
            `${EXPORT_INTERFACE} > TSMethodSignature`,
            `${EXPORT_INTERFACE} > TSCallSignatureDeclaration`,
          ],
          enableFixer: false,
        }],
      },
    },
    {
      files: relaxedFiles,
      rules: {
        'jsdoc/require-jsdoc': 'off',
      },
    },
  ];
});
