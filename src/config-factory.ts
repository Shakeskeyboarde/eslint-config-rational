import type { Linter } from 'eslint';

export type FlatConfig = Omit<Linter.FlatConfig, 'rules' | 'files' | 'ignores'> & {
  readonly files?: readonly (Linter.FlatConfigFileSpec | readonly Linter.FlatConfigFileSpec[])[];
  readonly ignores?: readonly Linter.FlatConfigFileSpec[];
  readonly rules?: Partial<Readonly<Linter.RulesRecord>>;
};

export type ConfigFactory<T extends {} = {}> = (
  ...args: {} extends T ? [options?: T] : [options: T]
) => readonly (FlatConfig | Linter.FlatConfig)[];
