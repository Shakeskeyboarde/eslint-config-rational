const getNormalExtensions = (extensions: string[]): string[] => {
  return extensions.map((ext) => ext.replace(/^\./u, ''));
};

/**
 * Get the default array of file extensions considered javascript files.
 */
export const getDefaultJsExtensions = (): `.${string}`[] => {
  return ['.js', '.cjs', '.mjs', '.jsx', '.mjsx', '.cjsx'];
};

/**
 * Get the default array of file extensions considered typescript files.
 */
export const getDefaultTsExtensions = (): `.${string}`[] => {
  return ['.ts', '.cts', '.mts', '.tsx', '.mtsx', '.ctsx'];
};

/**
 * Get glob patterns for files with the given extensions.
 */
export const getExtensionFileGlobs = (extensions: string[] = getDefaultJsExtensions()): string[] => {
  return [`**/*.{${getNormalExtensions(extensions).join(',')}}`];
};

/**
 * Get glob patterns for test files with the given extensions.
 */
export const getExtensionTestFileGlobs = (
  extensions: string[] = [...getDefaultJsExtensions(), ...getDefaultTsExtensions()],
): string[] => {
  extensions = getNormalExtensions(extensions);

  return [
    `**/{.,_}*.{${extensions}}`,
    `**/{.,_}*/**/*.{${extensions}}`,
    `**/*.{test,spec,story,config*}.{${extensions}}`,
  ];
};
