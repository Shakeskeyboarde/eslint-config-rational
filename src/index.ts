import base from './base.js';
import imports from './imports.js';
import react from './react.js';
import regexp from './regexp.js';
import stylistic from './stylistic.js';
import typescript from './typescript.js';
import unicorn from './unicorn.js';
import { configFactory, type NestedConfigs } from './utils/config.js';
import {
  defaultIgnores,
  defaultJsExtensions,
  defaultJsxExtensions,
  defaultRelaxedFiles,
  defaultTsExtensions,
} from './utils/defaults.js';
import { getExtensionsGlob } from './utils/get-extensions-glob.js';
import { isArray } from './utils/is-array.js';

export type { NestedConfigs, RelaxedFlatConfig } from './utils/config.js';
export * from './utils/defaults.js';

export interface Options {
  /**
   * Add ESLint global ignores.
   */
  ignores?: string | readonly string[];
  /**
   * Array of file extensions to lint as JavaScript.
   */
  jsExtensions?: readonly string[];
  /**
   * Array of file extensions to lint as TypeScript.
   */
  tsExtensions?: readonly string[];
  /**
   * Array of file extensions to lint as JSX.
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
   * Enable RegExp rules. Defaults to `true`.
   */
  enableRegExp?: boolean;
  /**
   * Enable stylistic rules. Defaults to `true`.
   */
  enableStylistic?: boolean;
  /**
   * One or more ESLint configurations to extend (nested arrays allowed).
   */
  extend?: NestedConfigs;
  /**
   * One or more ESLint override configurations (nested arrays allowed).
   */
  override?: NestedConfigs;
}

export default configFactory<Options>(({
  ignores = defaultIgnores,
  jsExtensions = defaultJsExtensions,
  tsExtensions = defaultTsExtensions,
  jsxExtensions = defaultJsxExtensions,
  relaxedFiles = defaultRelaxedFiles,
  enableUnicorn = true,
  enableImports = true,
  enableReact = true,
  enableTypescript = true,
  enableRegExp = true,
  enableStylistic = true,
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
    enableRegExp && regexp({ files: allFiles }),
    enableUnicorn && unicorn({ files: allFiles }),
    enableImports && imports({ files: allFiles, relaxedFiles }),
    enableReact && react({ files: jsxFiles }),
    enableTypescript && typescript({ files: tsFiles, relaxedFiles }),
    enableStylistic && stylistic({ files: allFiles }),
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
});
