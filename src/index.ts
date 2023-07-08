import base from './base.js';
import imports from './imports.js';
import prettier from './prettier.js';
import react from './react.js';
import typescript from './typescript.js';
import unicorn from './unicorn.js';
import { configFactory, type NestedConfigs } from './utils/config.js';
import * as constants from './utils/constants.js';
import { getExtensionsGlob } from './utils/get-extensions-glob.js';
import { isArray } from './utils/is-array.js';

export type { NestedConfigs, RelaxedFlatConfig } from './utils/config.js';

export interface Options {
  /**
   * Add ESLint global ignores.
   */
  ignores?: string | readonly string[];
  /**
   * Array of file extensions to lint as JavaScript.
   * Defaults to `['.js', '.cjs', '.mjs', '.jsx']`.
   */
  jsExtensions?: readonly string[];
  /**
   * Array of file extensions to lint as TypeScript.
   * Defaults to `['.ts', '.cts', '.mts', '.tsx']`.
   */
  tsExtensions?: readonly string[];
  /**
   * Array of file extensions to lint as JSX.
   * Defaults to `['.jsx', '.tsx']`.
   */
  jsxExtensions?: readonly string[];
  /**
   * Array of file paths to lint with relaxed rules.
   */
  relaxedFiles?: readonly string[];
  /**
   * Enable import rules. Defaults to `true`.
   */
  enableImports?: boolean;
  /**
   * Enable unicorn rules. Defaults to `true`.
   */
  enableUnicorn?: boolean;
  /**
   * Enable TypeScript rules. Defaults to `true`.
   */
  enableTypescript?: boolean;
  /**
   * Enable React rules. Defaults to `true`.
   */
  enableReact?: boolean;
  /**
   * Enable Prettier rules. Defaults to `true`.
   */
  enablePrettier?: boolean;
  /**
   * One or more ESLint configurations to extend (nested arrays allowed).
   */
  extend?: NestedConfigs;
  /**
   * One or more ESLint override configurations (nested arrays allowed).
   */
  override?: NestedConfigs;
}

export default configFactory<Options>(
  ({
    ignores = constants.ignores,
    jsExtensions = constants.jsExtensions,
    tsExtensions = constants.tsExtensions,
    jsxExtensions = constants.jsxExtensions,
    relaxedFiles = constants.relaxedFiles,
    enableUnicorn = true,
    enableImports = true,
    enableReact = true,
    enableTypescript = true,
    enablePrettier = true,
    extend,
    override,
  } = {}) => {
    const allFiles = getExtensionsGlob([...jsExtensions, ...tsExtensions, ...jsxExtensions]);
    const tsFiles = getExtensionsGlob(tsExtensions);
    const jsxFiles = getExtensionsGlob(jsxExtensions);

    return [
      ignores?.length && {
        ignores: isArray(ignores) ? ignores : [ignores],
      },
      extend,
      base({ files: allFiles, relaxedFiles }),
      enableUnicorn && unicorn({ files: allFiles }),
      enableImports && imports({ files: allFiles, relaxedFiles }),
      enableReact && react({ files: jsxFiles }),
      enableTypescript && typescript({ files: tsFiles, relaxedFiles }),
      enablePrettier && prettier({ files: allFiles }),
      override,
      {
        languageOptions: {
          parserOptions: {
            sourceType: 'module',
            ecmaVersion: 'latest',
          },
        },
      },
    ];
  },
);
