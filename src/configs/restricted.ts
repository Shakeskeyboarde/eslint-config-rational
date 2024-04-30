import { createConfigFactory, type NestedConfigs } from '../config.js';

/**
 * Custom restricted syntax rules for ESLint Rational.
 */
export const RESTRICTED_SYNTAX_RULES = {
  'no-export-leading-underscore': {
    message: 'Exports with leading underscores are not allowed.',
    relaxed: false,
    selector: [
      'ExportNamedDeclaration > ExportSpecifier[local.name=/^_/]',
      'ExportNamedDeclaration > ExportSpecifier[exported.name=/^_/]',
      'ExportNamedDeclaration > VariableDeclaration[id.name=/^_/]',
      'ExportNamedDeclaration > VariableDeclaration > VariableDeclarator[id.name=/^_/]',
    ],
  },
  'no-export-specifier': {
    message: 'Export specifiers are not allowed. Export the declaration directly instead.',
    relaxed: false,
    selector: [
      'ExportNamedDeclaration[specifiers.length>0][source=null]',
      // 'ExportDefaultDeclaration[declaration.type="Identifier"]',
    ],
  },
  // Typescript specific rules
  'no-untyped-promise-rejection': {
    message: 'Promise rejection handler error type must be explicit.',
    relaxed: false,
    selector: [
      `CallExpression[callee.property.name="catch"] > :first-child > :first-child:not([typeAnnotation])`,
      `CallExpression[callee.property.name="then"] > :nth-child(2) > :first-child:not([typeAnnotation])`,
    ],
  },
} as const satisfies Record<string, {
  readonly message: string;
  readonly selector: string | readonly string[];
  readonly relaxed: boolean;
}>;

/**
 * ESLint configuration for restricted syntax.
 */
export const restricted = createConfigFactory<{
  files: string[];
  relaxedFiles: string[];
  enable: Record<keyof typeof RESTRICTED_SYNTAX_RULES, boolean> | boolean | undefined;
  custom: { message: string; selector: string | string[]; relaxed?: boolean }[] | undefined;
}>(({ files, relaxedFiles, enable = true, custom = [] }): NestedConfigs => {
  const defs: { message: string; selector: string; relaxed?: boolean }[] = [
    ...Object.entries(RESTRICTED_SYNTAX_RULES)
      .flatMap(([rule, def]) => {
        return (enable && enable?.[rule as keyof typeof enable] !== false)
          ? def
          : [];
      }),
    ...custom,
  ].map(({ message, selector, relaxed }) => {
    return {
      message,
      selector: typeof selector === 'string'
        ? selector
        : `:matches(${selector
          .map((value) => value.replace(/\s+/gu, ' '))
          .join(', ')})`,
      relaxed,
    };
  });

  const rules = defs.filter(({ relaxed }) => !relaxed)
    .map(({ message, selector }) => ({ message, selector }));

  const relaxedRules = defs.filter(({ relaxed }) => relaxed)
    .map(({ message, selector }) => ({ message, selector }));

  return [
    {
      files,
      ignores: ['**/*.d.ts', ...relaxedFiles],
      rules: {
        'no-restricted-syntax': ['warn', ...rules],
      },
    },
    {
      files: relaxedFiles,
      ignores: ['**/*.d.ts', ...files],
      rules: {
        'no-restricted-syntax': ['warn', ...relaxedRules],
      },
    },
  ];
});
