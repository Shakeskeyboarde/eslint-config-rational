export const jsExtensions = ['.js', '.cjs', '.mjs', '.jsx'] as const;
export const tsExtensions = ['.ts', '.cts', '.mts', '.tsx'] as const;
export const jsxExtensions = ['.jsx', '.tsx'] as const;
export const relaxedFiles = [
  '**/*.test.*',
  '**/*.spec.*',
  '**/*.config.*',
  '**/*.setup.*',
  '**/.*rc.*',
  '**/*.story.*',
  '**/__*',
  '**/__*/**',
  '**/.*',
  '**/.*/**',
] as const;
