export const ignores = ['node_modules/', 'lib/', 'dist/', 'out/', 'coverage/'] as const;
export const jsExtensions = ['.js', '.cjs', '.mjs', '.jsx'] as const satisfies readonly `.${string}`[];
export const tsExtensions = ['.ts', '.cts', '.mts', '.tsx'] as const satisfies readonly `.${string}`[];
export const jsxExtensions = ['.jsx', '.tsx'] as const satisfies readonly `.${string}`[];
export const relaxedFiles = [
  '**/*.test.*',
  '**/*.spec.*',
  '**/*.config.*',
  '**/*.setup.*',
  '**/*.story.*',
  '**/__*.*',
  '**/__*/**',
  '**/.*.*',
  '**/.*/**',
] as const;
