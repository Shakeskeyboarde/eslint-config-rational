import type { Linter } from 'eslint';

/**
 * A nested array of ESLint flat configurations.
 */
export type NestedConfigs =
  | Linter.FlatConfig
  | null
  | undefined
  | false
  | 0
  | 0n
  | ''
  | NestedConfigs[];

type ConfigCallback<T extends {}> = (...args: {} extends T ? [options?: T] : [options: T]) => NestedConfigs;

type ConfigFactory<T extends {} = {}> = (...args: {} extends T ? [options?: T] : [options: T]) => Linter.FlatConfig[];

const flatten = (values: NestedConfigs): (Linter.FlatConfig | null | undefined | false | 0 | 0n | '')[] => {
  return Array.isArray(values) ? values.flatMap(flatten) : [values];
};

/**
 * Helper for creating ESLint flat configuration factories.
 */
export const createConfigFactory = <T extends {}>(callback: ConfigCallback<T>): ConfigFactory<T> => {
  return (...args) => {
    return flatten(callback(...args))
      .filter((value): value is Linter.FlatConfig => Boolean(value))
      .filter((value) => !value.files || value.files.length > 0);
  };
};
