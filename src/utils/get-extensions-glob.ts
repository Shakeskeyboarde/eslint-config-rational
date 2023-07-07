export const getExtensionsGlob = (extensions: readonly string[]): string[] => {
  return extensions.map((ext) => `**/*.${ext.replace(/^\./u, '')}`);
};
