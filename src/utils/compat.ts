import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { FlatCompat } from '@eslint/eslintrc';
import type { Linter } from 'eslint';

const __dirname = dirname(fileURLToPath(import.meta.url));
const compat = new FlatCompat({ cwd: __dirname });

export default ({ files, ...config }: Linter.Config & { files?: readonly string[] }): readonly Linter.FlatConfig[] => {
  return compat.config(config).map((flatConfig) => ({ ...(files ? { files: [...files] } : {}), ...flatConfig }));
};
