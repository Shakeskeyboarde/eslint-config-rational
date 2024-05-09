/**
 * Default ignore glob patterns.
 */
export const defaultIgnores = ['**/{.git,node_modules,lib,dist,out,coverage}'] as const;
/**
 * Default JavaScript file extensions.
 */
export const defaultJsExtensions = ['.js', '.cjs', '.mjs', '.jsx'] as const satisfies readonly `.${string}`[];
/**
 * Default TypeScript file extensions.
 */
export const defaultTsExtensions = ['.ts', '.cts', '.mts', '.tsx'] as const satisfies readonly `.${string}`[];
/**
 * Default JSX file extensions.
 */
export const defaultJsxExtensions = ['.jsx', '.tsx'] as const satisfies readonly `.${string}`[];
/**
 * Default relaxed file paths.
 */
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
