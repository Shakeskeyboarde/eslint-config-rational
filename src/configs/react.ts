import { compat } from '../compat.js';
import { createConfigFactory, type NestedConfigs } from '../config.js';

/**
 * ESLint configuration for `eslint-plugin-react`.
 */
export const react = createConfigFactory<{
  files: string[];
}>(({ files }): NestedConfigs => {
  return [
    // TODO: Update this to flat configuration compatible version when released.
    compat({
      files,
      extends: ['plugin:react/recommended', 'plugin:react/jsx-runtime', 'plugin:react-hooks/recommended'],
      settings: {
        react: {
          version: 'detect',
        },
      },
      rules: {
        'react/prop-types': 'off',
        'react/no-unescaped-entities': ['warn', { forbid: ['>', '}'] }],
      },
    }),
  ];
});
