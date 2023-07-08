import type { Linter } from 'eslint';

import { isArray } from './is-array.js';

export type RelaxedFlatConfig = Omit<Linter.FlatConfig, 'rules' | 'files' | 'ignores'> & {
  readonly files?: readonly (Linter.FlatConfigFileSpec | readonly Linter.FlatConfigFileSpec[])[];
  readonly ignores?: readonly Linter.FlatConfigFileSpec[];
  readonly rules?: Partial<Readonly<Linter.RulesRecord>>;
};

export type NestedConfigs =
  | RelaxedFlatConfig
  | Linter.FlatConfig
  | null
  | undefined
  | false
  | 0
  | 0n
  | ''
  | readonly NestedConfigs[];

type ConfigCallback<T extends {}> = (...args: {} extends T ? [options?: T] : [options: T]) => NestedConfigs;

type ConfigFactory<T extends {} = {}> = (...args: {} extends T ? [options?: T] : [options: T]) => Linter.FlatConfig[];

const flatten = (
  values: NestedConfigs,
): (RelaxedFlatConfig | Linter.FlatConfig | null | undefined | false | 0 | 0n | '')[] => {
  return isArray(values) ? values.flatMap(flatten) : [values];
};

export const configFactory = <T extends {}>(callback: ConfigCallback<T>): ConfigFactory<T> => {
  return (...args) => {
    return flatten(callback(...args)).filter((value): value is Linter.FlatConfig => Boolean(value));
  };
};
