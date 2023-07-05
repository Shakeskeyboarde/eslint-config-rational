/** @type {import('eslint').Linter.Config} */
module.exports = {
  env: { node: true },
  extends: ['./index.js', './warn.js'],
  ignorePatterns: ['node_modules', 'lib', 'out', 'dist'],
  overrides: [
    {
      files: ['*.cjs'],
      parserOptions: { sourceType: 'script' },
    },
    {
      files: ['*.mjs'],
      parserOptions: { sourceType: 'module' },
    },
    {
      files: ['*.js'],
      parserOptions: { sourceType: require('./package.json').type === 'module' ? 'module' : 'script' },
    },
    {
      extends: ['./react.js'],
      files: ['*.jsx', '*.tsx'],
    },
    {
      extends: ['./typescript.js'],
      files: ['*.ts', '*.tsx'],
      parserOptions: { project: './tsconfig.json' },
    },
  ],
  root: true,
};
