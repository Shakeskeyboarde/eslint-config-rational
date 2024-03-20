import jsdocPlugin from 'eslint-plugin-jsdoc';

import { createConfigFactory, type NestedConfigs } from '../config.js';

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
          // Exported JS things.
            ':matches(ExportDefaultDeclaration, ExportNamedDeclaration[source=null]):has(VariableDeclaration, ClassDeclaration, FunctionDeclaration, ArrowFunctionExpression)',
            ':matches(ExportDefaultDeclaration, ExportNamedDeclaration[source=null]) > ClassDeclaration > ClassBody > :matches(PropertyDefinition, MethodDefinition):not([accessibility="private"]):has(Identifier)',
            // Exported TS things.
            ':matches(ExportDefaultDeclaration, ExportNamedDeclaration[source=null]):has(TSInterfaceDeclaration, TSTypeAliasDeclaration, TSEnumDeclaration)',
            ':matches(ExportDefaultDeclaration, ExportNamedDeclaration[source=null]) > TSInterfaceDeclaration > TSInterfaceBody > :matches(TSPropertySignature, TSMethodSignature, TSCallSignatureDeclaration)',
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
