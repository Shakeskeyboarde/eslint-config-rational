import base from './base.js';
import imports from './imports.js';
import prettier from './prettier.js';
import react from './react.js';
import typescript from './typescript.js';
import unicorn from './unicorn.js';
import { configFactory } from './utils/config-factory.js';
import * as constants from './utils/constants.js';
import { getExtensionsGlob } from './utils/get-extensions-glob.js';

export default configFactory<{
  jsExtensions?: readonly string[];
  tsExtensions?: readonly string[];
  jsxExtensions?: readonly string[];
  relaxedFiles?: readonly string[];
}>(
  ({
    jsExtensions = constants.jsExtensions,
    tsExtensions = constants.tsExtensions,
    jsxExtensions = constants.jsxExtensions,
    relaxedFiles = constants.relaxedFiles,
  } = {}) => {
    const allFiles = getExtensionsGlob([...jsExtensions, ...tsExtensions, ...jsxExtensions]);
    const tsFiles = getExtensionsGlob(tsExtensions);
    const jsxFiles = getExtensionsGlob(jsxExtensions);

    return [
      ...base({ files: allFiles, relaxedFiles }),
      ...imports({ files: allFiles, relaxedFiles }),
      ...unicorn({ files: allFiles }),
      ...typescript({ files: tsFiles, relaxedFiles }),
      ...react({ files: jsxFiles }),
      ...prettier({ files: allFiles }),
      {
        languageOptions: {
          parserOptions: {
            sourceType: 'module',
            ecmaVersion: 'latest',
          },
        },
      },
    ];
  },
);
