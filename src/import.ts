import compat from './compat.js';
import type { ConfigFactory } from './config-factory.js';
import { jsExtensions } from './constants.js';

const factory: ConfigFactory<{
  readonly files: readonly string[];
  readonly relaxedFiles: readonly string[];
}> = ({ files, relaxedFiles }) => {
  return [
    // TODO: Update this to flat configuration compatible version when released.
    ...compat({
      files,
      plugins: ['import'],
      extends: ['plugin:import/recommended'],
    }),

    {
      files,
      settings: {
        // XXX: Work around for https://github.com/import-js/eslint-plugin-import/issues/2556#issuecomment-1419518561
        'import/parsers': {
          espree: jsExtensions,
        },
        'import/resolver': {
          node: true,
        },
      },
      rules: {
        'import/extensions': ['error', 'never', { ignorePackages: true, pattern: { js: 'always' } }],
        'import/no-cycle': 'error',
        'import/no-extraneous-dependencies': ['warn', { devDependencies: false }],
        'import/no-self-import': 'error',
        'import/no-unresolved': 'error',
      },
    },

    {
      files: relaxedFiles,
      rules: {
        'import/no-extraneous-dependencies': 'off',
        'import/no-named-as-default-member': 'off',
      },
    },
  ];
};

export default factory;
