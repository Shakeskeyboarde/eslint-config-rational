import { type ImportOptions } from './rational-import.js';
import { type ImportSortOptions } from './rational-import-sort.js';
import { type ReactOptions } from './rational-react.js';
import { type ReactHooksOptions } from './rational-react-hooks.js';
import { type RegexpOptions } from './rational-regexp.js';
import { type StylisticOptions } from './rational-stylistic.js';
import { type TypescriptOptions } from './rational-typescript.js';
import { type UnicornOptions } from './rational-unicorn.js';

/**
 * Rational sharable config options.
 */
export interface Options {
  /**
   * Override for what file extensions are considered javascript files.
   */
  jsExtensions?: `.${string}`[] | ((defaults: `.${string}`[]) => `.${string}`[]);
  /**
   * Override globa for which files are considered javascript files. Defaults
   * to globs derived from `jsExtensions`.
   */
  jsFiles?: string[] | ((defaults: string[]) => string[]);
  /**
   * Override globs for which files are considered javascript _development_
   * files. Development files are things like test and configuration files.
   * Rules can generally be slightly relaxed for these files. Defaults to globs
   * derived from `jsExtensions`.
   */
  jsDevFiles?: string[] | ((defaults: string[]) => string[]);

  /**
   * Override for what file extensions are considered typescript files.
   */
  tsExtensions?: `.${string}`[] | ((defaults: `.${string}`[]) => `.${string}`[]);
  /**
   * Override globs for which files are considered typescript files. Defaults
   * to globs derived from `tsExtensions`.
   */
  tsFiles?: string[] | ((defaults: string[]) => string[]);
  /**
   * Override globs for which files are considered typescript _development_
   * files. Development files are things like test and configuration files.
   * Rules can generally be slightly relaxed for these files. Defaults to globs
   * derived from `tsExtensions`.
   */
  tsDevFiles?: string[] | ((defaults: string[]) => string[]);

  /**
   * Override for what file extensions are considered react files. Defaults to
   * globs derived from `jsExtensions` and `tsExtensions` where the extension
   * ends with an `x`
   */
  reactExtensions?: `.${string}`[] | ((defaults: `.${string}`[]) => `.${string}`[]);

  /**
   * Override globs for which files are considered react files. Defaults to
   * globs derived from `reactExtensions`.
   */
  reactFiles?: string[] | ((defaults: string[]) => string[]);

  /**
   * Disable or enable plugins. All plugins are enabled by default.
   */
  plugins?: {
    import?: boolean | ImportOptions;
    importSort?: boolean | ImportSortOptions;
    react?: boolean | ReactOptions;
    reactHooks?: boolean | ReactHooksOptions;
    regexp?: boolean | RegexpOptions;
    stylistic?: boolean | StylisticOptions;
    typescript?: boolean | TypescriptOptions;
    unicorn?: boolean | UnicornOptions;
  };
}
