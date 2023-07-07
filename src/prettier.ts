import compat from './utils/compat.js';
import { configFactory } from './utils/config-factory.js';

export default configFactory<{
  readonly files: readonly string[];
}>(({ files }) => {
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
});
