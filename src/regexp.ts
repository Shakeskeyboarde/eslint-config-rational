import compat from './utils/compat.js';
import { configFactory } from './utils/config.js';

export default configFactory<{
  readonly files: readonly string[];
}>(({ files }) => {
  return [
    compat({
      files,
      extends: ['plugin:regexp/recommended'],
      rules: {
        'require-unicode-regexp': 'warn',
      },
    }),
  ];
});
