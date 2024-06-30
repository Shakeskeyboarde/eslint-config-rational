import { type Linter } from 'eslint';

import { flatConfigBuilder } from '../config.js';
import { getDefaultJsExtensions, getDefaultTsExtensions, getExtensionFileGlobs } from '../files.js';

export interface ReactHooksOptions {
  files?: string[];
}

/**
 * Rational
 * [eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react)
 * configuration.
 */
export default ({
  files = getExtensionFileGlobs([...getDefaultJsExtensions(), ...getDefaultTsExtensions()].filter((ext) => ext.endsWith('x'))),
}: ReactHooksOptions = {}): Linter.FlatConfig[] => {
  return flatConfigBuilder()
    .useLegacy({
      resolvePluginsRelativeTo: import.meta.url,
      files,
      extends: ['plugin:react-hooks/recommended'],
    })
    .build();
};
