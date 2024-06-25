import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { FlatCompat } from '@eslint/eslintrc';
import { type Linter } from 'eslint';

type Falsy = boolean | null | undefined | 0 | 0n | '';

interface LegacyConfig extends Linter.Config {
  /**
   * Included file patterns for the resulting flat configurations.
   */
  files?: string[];
  /**
   * Ignored file patterns for the resulting flat configurations.
   */
  ignores?: string[];
  /**
   * Resolve plugins relative to this path. If this is a `file:` URL, it is
   * assumed to be `import.meta.url`, and will be converted to a simple
   * directory path.
   */
  resolvePluginsRelativeTo?: string;
}

/**
 * XXX: Recursively delete any undefined own properties on config objects.
 * ESLint flat configs validation does not allow explicit undefined values for
 * optional properties.
 */
const cleanConfig = (value: unknown, visited: Set<unknown>): void => {
  if (visited.has(value)) return;

  if (Array.isArray(value)) {
    visited.add(value);
    value.forEach((v) => cleanConfig(v, visited));
  }
  else if (Object.prototype.toString.call(value) === '[object Object]') {
    visited.add(value);

    const obj = value as Record<string, unknown>;

    for (const key of Object.getOwnPropertyNames(obj)) {
      if (obj[key] === undefined) {
        delete obj[key];
      }
      else {
        cleanConfig(obj[key], visited);
      }
    }
  }
};

/**
 * Helper for building ESLint flat configurations.
 */
export class FlatConfigBuilder {
  readonly #configs: readonly Linter.FlatConfig[] = [];

  protected constructor(configs: Linter.FlatConfig[]) {
    this.#configs = configs;
  }

  /**
   * Use flat configurations. Can also be falsy or a factory function.
   */
  readonly use = <TArgs extends unknown[] = []>(
    config:
      | Linter.FlatConfig
      | Linter.FlatConfig[]
      | Falsy
      | ((...args: TArgs) => Linter.FlatConfig
      | Linter.FlatConfig[]),
    ...args: TArgs
  ): FlatConfigBuilder => {
    if (!config || (typeof config !== 'object' && typeof config !== 'function')) return this;
    if (typeof config === 'function') config = config(...args);
    if (!config || typeof config !== 'object') return this;
    if (!Array.isArray(config)) config = [config];

    cleanConfig(config, new Set());

    return new FlatConfigBuilder([...this.#configs, ...config]);
  };

  /**
   * Use a legacy (eslintrc) configuration. Can also be falsy.
   */
  readonly useLegacy = (config: LegacyConfig | Falsy): FlatConfigBuilder => {
    if (!config || (typeof config !== 'object' && typeof config !== 'function')) return this;

    const { files, ignores, resolvePluginsRelativeTo, ...compatConfig } = config;
    const compat = new FlatCompat({
      resolvePluginsRelativeTo: resolvePluginsRelativeTo?.startsWith('file:')
        ? dirname(fileURLToPath(resolvePluginsRelativeTo))
        : resolvePluginsRelativeTo,
    });
    const configs = compat
      .config(compatConfig)
      .map((value) => ({
        ...value,
        ...(files ? { files } : null),
        ...(ignores ? { ignores } : null),
      }));

    return this.use(configs);
  };

  /**
   * Add global ignore patterns to any previously defined global ignore
   * patterns. This is always additive. If you want to replace previous global
   * ignore patterns, call `use({ ignores: [...] })` instead.
   */
  readonly ignore = (...patterns: string[]): FlatConfigBuilder => {
    const current = this.#configs.find((config): config is { ignores: string[] } => {
      const keys = Object.keys(config);
      return keys.length === 1 && keys[0] === 'ignores';
    });

    return this.use({ ignores: [...(current?.ignores ?? []), ...patterns] });
  };

  readonly build = (): Linter.FlatConfig[] => {
    return Array.from(this.#configs);
  };

  static create(): FlatConfigBuilder {
    return new FlatConfigBuilder([]);
  }
}

export const flatConfigBuilder = (): FlatConfigBuilder => {
  return FlatConfigBuilder.create();
};
