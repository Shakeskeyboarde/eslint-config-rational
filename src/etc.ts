import compat from './utils/compat.js';
import { configFactory } from './utils/config.js';

export default configFactory<{
  readonly files: readonly string[];
}>(({ files }) => {
  return [
    compat({
      files,
      extends: ['plugin:etc/recommended'],
      parserOptions: {
        project: './tsconfig.json',
      },
      rules: {
        'etc/throw-error': 'error',
      },
    }),
  ];
});
