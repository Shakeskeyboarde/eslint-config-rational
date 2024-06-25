import { type Linter } from 'eslint';
import reactRecommended from 'eslint-plugin-react/configs/recommended.js';

import { flatConfigBuilder } from '../config.js';

interface Options {
  files?: string[];
}

/**
 * Rational
 * [eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react)
 * configuration.
 */
export default ({ files }: Options = {}): Linter.FlatConfig[] => {
  return flatConfigBuilder()
    .use({ ...reactRecommended, files })
    .use({
      files,
      rules: {
        'react/prop-types': 'off',
        'react/no-unescaped-entities': ['warn', { forbid: ['>', '}'] }],
      },
      settings: {
        react: {
          version: 'detect',
        },
      },
    })
    .build();
};
