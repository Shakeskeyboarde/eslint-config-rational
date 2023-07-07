import javascript from './javascript.js';
import prettier from './prettier.js';
import react from './react.js';
import typescript from './typescript.js';
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
    return [
      ...javascript({ files: getExtensionsGlob(jsExtensions), relaxedFiles }),
      ...typescript({ files: getExtensionsGlob(tsExtensions), relaxedFiles }),
      ...react({ files: getExtensionsGlob(jsxExtensions), relaxedFiles }),
      ...prettier({ files: getExtensionsGlob([...jsExtensions, ...tsExtensions]) }),
    ];
  },
);
