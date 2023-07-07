import compat from './compat.js';
import type { ConfigFactory } from './config-factory.js';

const factory: ConfigFactory<{
  readonly extensions: readonly string[];
}> = ({ extensions }) => {
  const files = extensions.map((ext) => `**/*${ext}`);

  return [
    // TODO: Update this to flat configuration compatible version when released.
    ...compat({
      files,
      extends: ['plugin:prettier/recommended'],
    }),

    {
      files,
      rules: {
        'prettier/prettier': 'warn',
      },
    },
  ];
};

export default factory;
