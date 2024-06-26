import { type Linter } from 'eslint';

/**
 * Rational language options reset. This just ensure that the `sourceType` is
 * set to `module`, and the `ecmaVersion` is set to `latest`.
 */
export default (): Linter.FlatConfig => ({
  languageOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest',
    parserOptions: {
      sourceType: 'module',
      ecmaVersion: 'latest',
    },
  },
});
