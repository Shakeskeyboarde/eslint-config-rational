export const defaultIgnores = ['**/node_modules/', '**/lib/', '**/dist/', '**/out/', '**/coverage/'] as const;
export const defaultJsExtensions = ['.js', '.cjs', '.mjs', '.jsx'] as const satisfies readonly `.${string}`[];
export const defaultTsExtensions = ['.ts', '.cts', '.mts', '.tsx'] as const satisfies readonly `.${string}`[];
export const defaultJsxExtensions = ['.jsx', '.tsx'] as const satisfies readonly `.${string}`[];
export const defaultRelaxedFiles = [
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
