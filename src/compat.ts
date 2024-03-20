import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { FlatCompat } from '@eslint/eslintrc';
import type { Linter } from 'eslint';

const __dirname = dirname(fileURLToPath(import.meta.url));
const flatCompat = new FlatCompat({ cwd: __dirname });

/**
 * Helper which converts classic (non-flat) ESLint configurations into flat
 * configurations scoped to specific files.
 */
export const compat = ({
  files = [],
  ...config
}: Linter.Config & { files?: string[] }): Linter.FlatConfig[] => {
  return flatCompat.config(config)
    .map((flatConfig) => ({
      files: [...files],
      ...flatConfig,
    }));
};
