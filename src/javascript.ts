import { configFactory } from './utils/config-factory.js';

export default configFactory<{
  readonly files: readonly string[];
  readonly relaxedFiles: readonly string[];
}>(({ files }) => {
  return [
    {
      files,
      languageOptions: {
        parserOptions: {
          ecmaVersion: 'latest',
        },
      },
    },
  ];
});
