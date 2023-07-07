import type { ConfigFactory } from './config-factory.js';
import * as constants from './constants.js';
import javascript from './javascript.js';
import prettier from './prettier.js';
import react from './react.js';
import typescript from './typescript.js';

const rational: ConfigFactory<{
  jsExtensions?: readonly string[];
  tsExtensions?: readonly string[];
  jsxExtensions?: readonly string[];
  relaxedFiles?: readonly string[];
}> = ({
  jsExtensions = constants.jsExtensions,
  tsExtensions = constants.tsExtensions,
  jsxExtensions = constants.jsxExtensions,
  relaxedFiles = constants.relaxedFiles,
} = {}) => {
  jsExtensions = jsExtensions.map((ext) => (ext.startsWith('.') ? ext : `.${ext}`));
  tsExtensions = tsExtensions.map((ext) => (ext.startsWith('.') ? ext : `.${ext}`));
  jsxExtensions = jsxExtensions.map((ext) => (ext.startsWith('.') ? ext : `.${ext}`));

  return [
    // Add configs here...
    ...javascript({ extensions: jsExtensions, relaxedFiles }),
    ...typescript({ extensions: tsExtensions, relaxedFiles }),
    ...react({ extensions: jsxExtensions, relaxedFiles }),
    ...prettier({ extensions: [...jsExtensions, ...tsExtensions] }),
  ];
};

export default rational;
