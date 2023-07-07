import type { Linter } from 'eslint';

type FlatConfig = Omit<Linter.FlatConfig, 'rules' | 'files' | 'ignores'> & {
  readonly files?: readonly (Linter.FlatConfigFileSpec | readonly Linter.FlatConfigFileSpec[])[];
  readonly ignores?: readonly Linter.FlatConfigFileSpec[];
  readonly rules?: Partial<Readonly<Linter.RulesRecord>>;
};

type ConfigFactory<T extends {} = {}> = (
  ...args: {} extends T ? [options?: T] : [options: T]
) => readonly (FlatConfig | Linter.FlatConfig)[];

export const configFactory = <T extends {}, F extends ConfigFactory<T> = ConfigFactory<T>>(factory: F): F => {
  return factory;
};
