import { type Linter } from 'eslint';

import { flatConfigBuilder } from '../config.js';

export interface ImportOptions {
  files?: string[];
  supportFiles?: string[];
  jsExtensions?: `.${string}`[];
  tsExtensions?: `.${string}`[];
  useTypescript?: boolean;
}

/**
 * Rational
 * [eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import)
 * configuration.
 */
export default ({
  files,
  supportFiles,
  jsExtensions,
  tsExtensions,
  useTypescript = Boolean(tsExtensions?.length),
}: ImportOptions = {}): Linter.FlatConfig[] => {
  return flatConfigBuilder()
    // TODO: Use flat configs when available.
    .useLegacy({
      resolvePluginsRelativeTo: import.meta.url,
      files,
      extends: useTypescript
        ? ['plugin:import/recommended', 'plugin:import/typescript']
        : ['plugin:import/recommended'],
    })
    // Universal Config
    .use({
      files,
      rules: {
        'import/extensions': ['error', 'never', {
          ignorePackages: true,
          pattern: { js: 'always' },
        }],
        'import/no-cycle': 'error',
        'import/no-named-as-default-member': 'off',
        'import/no-self-import': 'error',
        'import/no-unresolved': 'error',
      },
      languageOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
        parserOptions: {
          sourceType: 'module',
          ecmaVersion: 'latest',
        },
      },
      settings: {
        'import/parsers': {
          espree: jsExtensions,
          ...(useTypescript ? { '@typescript-eslint/parser': tsExtensions } : {}),
        },
        'import/resolver': {
          node: true,
          typescript: useTypescript,
        },
      },
    })
    // Non-Support Config
    .use({
      files,
      ignores: supportFiles,
      rules: {
        'import/no-extraneous-dependencies': ['error', { devDependencies: false }],
      },
    })
    .build();
};
