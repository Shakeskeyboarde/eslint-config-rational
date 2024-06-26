import { type Linter } from 'eslint';
import reactJsxRuntime from 'eslint-plugin-react/configs/jsx-runtime.js';
import reactRecommended from 'eslint-plugin-react/configs/recommended.js';

import { flatConfigBuilder } from '../config.js';
import { getDefaultJsExtensions, getDefaultTsExtensions, getExtensionFileGlobs } from '../files.js';

export interface ReactOptions {
  files?: string[];
  jsxRuntime?: boolean;
}

/**
 * Rational
 * [eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react)
 * configuration.
 */
export default ({
  files = getExtensionFileGlobs([...getDefaultJsExtensions(), ...getDefaultTsExtensions()].filter((ext) => ext.endsWith('x'))),
  jsxRuntime = true,
}: ReactOptions = {}): Linter.FlatConfig[] => {
  return flatConfigBuilder()
    .use({ ...reactRecommended, files })
    .use(jsxRuntime && { ...reactJsxRuntime, files })
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
