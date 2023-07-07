export const jsExtensions = ['.js', '.cjs', '.mjs', '.jsx'] as const satisfies readonly `.${string}`[];
export const tsExtensions = ['.ts', '.cts', '.mts', '.tsx'] as const satisfies readonly `.${string}`[];
export const jsxExtensions = ['.jsx', '.tsx'] as const satisfies readonly `.${string}`[];
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
