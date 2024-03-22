import { createConfigFactory, type NestedConfigs } from '../config.js';
import {
  defaultIgnores,
  defaultJsExtensions,
  defaultJsxExtensions,
  defaultRelaxedFiles,
  defaultTsExtensions,
} from '../defaults.js';
import { base } from './base.js';
import { imports } from './imports.js';
import { jsdoc } from './jsdoc.js';
import { react } from './react.js';
import { regexp } from './regexp.js';
import { restricted, type RESTRICTED_SYNTAX_RULES } from './restricted.js';
import { stylistic } from './stylistic.js';
import { typescript } from './typescript.js';
import { unicorn } from './unicorn.js';

/**
 * ESLint configuration factory options.
 */
export interface Options {
  /**
   * Add ESLint global ignores.
   */
  ignores?: string | string[];
  /**
   * Array of file extensions to lint as JavaScript.
   */
  jsExtensions?: string[];
  /**
   * Array of file extensions to lint as TypeScript.
   */
  tsExtensions?: string[];
  /**
   * Array of file extensions to lint as JSX.
   */
  jsxExtensions?: string[];
  /**
   * Array of file paths to lint with relaxed rules.
   */
  relaxedFiles?: string[];
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
   * Enable jsdoc rules. Defaults to `true`.
   */
  enableJsdoc?: boolean;
  /**
   * Enable restricted syntax rules. Defaults to `true`.
   */
  enableRestricted?: boolean | Record<keyof typeof RESTRICTED_SYNTAX_RULES, boolean>;
  /**
   * Custom restricted syntax rules.
   */
  customRestricted?: { message: string; selector: string | string[]; relaxed?: boolean }[];
  /**
   * One or more ESLint configurations to extend (nested arrays allowed).
   */
  extend?: NestedConfigs;
  /**
   * One or more ESLint override configurations (nested arrays allowed).
   */
  override?: NestedConfigs;
}

/**
 * Rational ESLint configuration.
 */
export const rational = createConfigFactory<Options>(({
  ignores = Array.from(defaultIgnores),
  jsExtensions = Array.from(defaultJsExtensions),
  tsExtensions = Array.from(defaultTsExtensions),
  jsxExtensions = Array.from(defaultJsxExtensions),
  relaxedFiles = Array.from(defaultRelaxedFiles),
  enableUnicorn = true,
  enableImports = true,
  enableReact = true,
  enableTypescript = true,
  enableRegExp = true,
  enableStylistic = true,
  enableJsdoc = true,
  enableRestricted = true,
  customRestricted = [],
  extend,
  override,
} = {}): NestedConfigs => {
  const allFiles = getExtensionsGlob([...jsExtensions, ...tsExtensions, ...jsxExtensions]);
  const tsFiles = getExtensionsGlob(tsExtensions);
  const jsxFiles = getExtensionsGlob(jsxExtensions);

  return [
    ignores?.length && {
      ignores: Array.isArray(ignores) ? ignores : [ignores],
    },
    extend,
    base({ files: allFiles, relaxedFiles }),
    enableRegExp && regexp({ files: allFiles }),
    enableUnicorn && unicorn({ files: allFiles }),
    enableImports && imports({ files: allFiles, relaxedFiles }),
    enableReact && react({ files: jsxFiles }),
    enableTypescript && typescript({ files: tsFiles, relaxedFiles }),
    enableStylistic && stylistic({ files: allFiles }),
    enableJsdoc && jsdoc({ files: allFiles, relaxedFiles }),
    enableRestricted && restricted({
      files: allFiles,
      relaxedFiles,
      enable: enableRestricted,
      custom: customRestricted,
    }),
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

const getExtensionsGlob = (extensions: string[]): string[] => {
  return extensions.map((ext) => `**/*.${ext.replace(/^\./u, '')}`);
};
