import { type Linter } from 'eslint';
import prettier from 'eslint-plugin-prettier/recommended';

import { flatConfigBuilder } from '../config.js';
import { getDefaultJsExtensions, getDefaultTsExtensions, getExtensionFileGlobs } from '../files.js';

export interface PrettierOptions {
  files?: string[];
}

/**
 * ESLint configuration for `eslint-plugin-prettier`.
 */
export default ({
  files = getExtensionFileGlobs([...getDefaultJsExtensions(), ...getDefaultTsExtensions()]),
}: PrettierOptions = {}): Linter.FlatConfig[] => {
  return flatConfigBuilder()
    .use({ ...prettier, files })
    .build();
};
