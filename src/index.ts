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
  enableImports?: boolean;
  enableUnicorn?: boolean;
  enableTypescript?: boolean;
  enableReact?: boolean;
  enablePrettier?: boolean;
}>(
  ({
    jsExtensions = constants.jsExtensions,
    tsExtensions = constants.tsExtensions,
    jsxExtensions = constants.jsxExtensions,
    relaxedFiles = constants.relaxedFiles,
    enableImports = false,
    enableUnicorn = false,
    enableTypescript = false,
    enableReact = false,
    enablePrettier = false,
  } = {}) => {
    const allFiles = getExtensionsGlob([...jsExtensions, ...tsExtensions, ...jsxExtensions]);
    const tsFiles = getExtensionsGlob(tsExtensions);
    const jsxFiles = getExtensionsGlob(jsxExtensions);

    return [
      ...base({ files: allFiles, relaxedFiles }),
      ...(enableImports ? imports({ files: allFiles, relaxedFiles }) : []),
      ...(enableUnicorn ? unicorn({ files: allFiles }) : []),
      ...(enableTypescript ? typescript({ files: tsFiles, relaxedFiles }) : []),
      ...(enableReact ? react({ files: jsxFiles }) : []),
      ...(enablePrettier ? prettier({ files: allFiles }) : []),
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
