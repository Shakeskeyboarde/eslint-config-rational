import { createConfigFactory, type NestedConfigs } from '../config.js';

const matches = (...values: string[]): string => {
  const content = values
    .map((value) => value.replace(/\s+/gu, ' '))
    .join(', ');

  return `:matches(${content})`;
};

/**
 * Custom restricted syntax rules for ESLint Rational.
 */
export const RESTRICTED_SYNTAX_RULES = {
  'no-export-leading-underscore': {
    message: 'Exports with leading underscores are not allowed.',
    selector: matches(
      'ExportNamedDeclaration > ExportSpecifier[local.name=/^_/]',
      'ExportNamedDeclaration > ExportSpecifier[exported.name=/^_/]',
      'ExportNamedDeclaration > VariableDeclaration[id.name=/^_/]',
      'ExportNamedDeclaration > VariableDeclaration > VariableDeclarator[id.name=/^_/]',
    ),
  },
  'no-export-specifier': {
    message: 'Export specifiers are not allowed. Export the declaration directly instead.',
    selector: matches(
      'ExportNamedDeclaration[specifiers.length>0][source=null]',
      'ExportDefaultDeclaration[declaration.type="Identifier"]',
    ),
  },
  // Typescript specific rules
  'no-untyped-promise-rejection': {
    message: 'Promise rejection handler error type must be explicit.',
    selector: matches(
      `CallExpression[callee.property.name="catch"] > :first-child > :first-child:not([typeAnnotation])`,
      `CallExpression[callee.property.name="then"] > :nth-child(2) > :first-child:not([typeAnnotation])`,
    ),
  },
} as const satisfies Record<string, { readonly message: string; readonly selector: string }>;

/**
 * ESLint configuration for restricted syntax.
 */
export const restricted = createConfigFactory<{
  files: string[];
  enable: Record<keyof typeof RESTRICTED_SYNTAX_RULES, boolean> | boolean | undefined;
  custom: { message: string; selector: string | string[] }[] | undefined;
}>(({ files, enable = true, custom = [] }): NestedConfigs => {
  return {
    files,
    ignores: ['**/*.d.ts'],
    rules: {
      'no-restricted-syntax': [
        'warn',
        ...Object.entries(RESTRICTED_SYNTAX_RULES)
          .flatMap(([rule, def]) => enable && (enable?.[rule as keyof typeof enable] !== false ? def : [])),
        ...custom.map(({ message, selector }) => ({ message, selector: typeof selector === 'string' ? selector : matches(...selector) })),
      ],
    },
  };
});
