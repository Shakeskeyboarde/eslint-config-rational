import unicorn from 'eslint-plugin-unicorn';

import type { ConfigFactory } from './config-factory.js';

const factory: ConfigFactory<{
  readonly files: readonly string[];
}> = ({ files }) => {
  return [
    {
      files,
      plugins: {
        unicorn,
      },
      rules: {
        'unicorn/consistent-destructuring': 'warn',
        'unicorn/error-message': 'warn',
        'unicorn/escape-case': 'warn',
        'unicorn/filename-case': 'warn',
        'unicorn/new-for-builtins': 'error',
        'unicorn/no-abusive-eslint-disable': 'error',
        'unicorn/no-array-method-this-argument': 'error',
        'unicorn/no-hex-escape': 'warn',
        'unicorn/no-lonely-if': 'warn',
        'unicorn/no-new-array': 'error',
        'unicorn/no-new-buffer': 'error',
        'unicorn/no-process-exit': 'warn',
        'unicorn/no-static-only-class': 'warn',
        'unicorn/no-unused-properties': 'warn',
        'unicorn/no-zero-fractions': 'warn',
        'unicorn/number-literal-case': 'warn',
        'unicorn/numeric-separators-style': 'warn',
        'unicorn/prefer-export-from': 'error',
        'unicorn/prefer-negative-index': 'warn',
        'unicorn/prefer-node-protocol': 'error',
        'unicorn/prefer-number-properties': 'error',
        'unicorn/relative-url-style': 'warn',
      },
    },
  ];
};

export default factory;
