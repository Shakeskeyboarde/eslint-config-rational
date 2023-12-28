export const defaultIgnores = ['**/{.git,node_modules,out,lib,dist}'] as const;
export const defaultJsExtensions = ['.js', '.cjs', '.mjs', '.jsx'] as const satisfies readonly `.${string}`[];
export const defaultTsExtensions = ['.ts', '.cts', '.mts', '.tsx'] as const satisfies readonly `.${string}`[];
export const defaultJsxExtensions = ['.jsx', '.tsx'] as const satisfies readonly `.${string}`[];
export const defaultRelaxedFiles = [
  '**/*example*.*',
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
