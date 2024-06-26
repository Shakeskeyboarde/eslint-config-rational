import { type Linter } from 'eslint';
import * as regexpPlugin from 'eslint-plugin-regexp';

import { flatConfigBuilder } from '../config.js';
import { getDefaultJsExtensions, getDefaultTsExtensions, getExtensionFileGlobs } from '../files.js';

export interface RegexpOptions {
  files?: string[];
}

/**
 * ESLint configuration for `eslint-plugin-regexp`.
 */
export default ({
  files = getExtensionFileGlobs([...getDefaultJsExtensions(), ...getDefaultTsExtensions()]),
}: RegexpOptions = {}): Linter.FlatConfig[] => {
  return flatConfigBuilder()
    .use({ ...regexpPlugin.configs['flat/recommended'] as Linter.FlatConfig, files })
    .build();
};
