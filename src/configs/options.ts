import { type ImportOptions } from './rational-import.js';
import { type ImportSortOptions } from './rational-import-sort.js';
import { type ReactOptions } from './rational-react.js';
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
  jsExtensions?: `.${string}`[];
  /**
   * Override globa for which files are considered javascript files. Defaults
   * to globs derived from `jsExtensions`.
   */
  jsFiles?: string[];
  /**
   * Override globs for which files are considered javascript _development_
   * files. Development files are things like test and configuration files.
   * Rules can generally be slightly relaxed for these files. Defaults to globs
   * derived from `jsExtensions`.
   */
  jsDevFiles?: string[];

  /**
   * Override for what file extensions are considered typescript files.
   */
  tsExtensions?: `.${string}`[];
  /**
   * Override globs for which files are considered typescript files. Defaults
   * to globs derived from `tsExtensions`.
   */
  tsFiles?: string[];
  /**
   * Override globs for which files are considered typescript _development_
   * files. Development files are things like test and configuration files.
   * Rules can generally be slightly relaxed for these files. Defaults to globs
   * derived from `tsExtensions`.
   */
  tsDevFiles?: string[];

  /**
   * Override for what file extensions are considered react files. Defaults to
   * globs derived from `jsExtensions` and `tsExtensions` where the extension
   * ends with an `x`
   */
  reactExtensions?: `.${string}`[];
  /**
   * Override globs for which files are considered react files. Defaults to
   * globs derived from `reactExtensions`.
   */
  reactFiles?: string[];

  /**
   * Disable or enable plugins. All plugins are enabled by default.
   */
  plugins?: {
    import?: boolean | ImportOptions;
    importSort?: boolean | ImportSortOptions;
    react?: boolean | ReactOptions;
    regexp?: boolean | RegexpOptions;
    stylistic?: boolean | StylisticOptions;
    typescript?: boolean | TypescriptOptions;
    unicorn?: boolean | UnicornOptions;
  };
}
