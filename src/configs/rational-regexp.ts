import { type Linter } from 'eslint';
import * as regexpPlugin from 'eslint-plugin-regexp';

import { flatConfigBuilder } from '../config.js';

interface Options {
  files?: string[];
}

/**
 * ESLint configuration for `eslint-plugin-regexp`.
 */
export default ({ files }: Options = {}): Linter.FlatConfig[] => {
  return flatConfigBuilder()
    .use({ ...regexpPlugin.configs['flat/recommended'] as Linter.FlatConfig, files })
    .build();
};
