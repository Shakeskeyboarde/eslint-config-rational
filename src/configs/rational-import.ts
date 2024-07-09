import { type Linter } from 'eslint';

import { flatConfigBuilder } from '../config.js';
import { getDefaultJsExtensions, getDefaultTsExtensions, getExtensionDevFileGlobs, getExtensionFileGlobs } from '../files.js';

export interface ImportOptions {
  files?: string[];
  devFiles?: string[];
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
  jsExtensions = getDefaultJsExtensions(),
  tsExtensions = getDefaultTsExtensions(),
  files = getExtensionFileGlobs([...jsExtensions, ...tsExtensions]),
  devFiles = getExtensionDevFileGlobs([...jsExtensions, ...tsExtensions]),
  useTypescript = Boolean(tsExtensions?.length),
}: ImportOptions = {}): Linter.FlatConfig[] => {
  return flatConfigBuilder()
    // TODO: Use flat configs when available.
    .useLegacy({
      resolvePluginsRelativeTo: import.meta.url,
      files,
      plugins: ['import'],
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
        'import/no-self-import': 'error',
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
    // Prod Config
    .use({
      files,
      ignores: devFiles,
      rules: {
        'import/no-extraneous-dependencies': ['error', { devDependencies: false }],
      },
    })
    .build();
};
