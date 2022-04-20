/** @type {import('eslint').Linter.Config} */
module.exports = {
  env: { node: true },
  extends: ['./index.js', './warn.js', './prettier.js'],
  ignorePatterns: ['node_modules', 'lib', 'out', 'dist'],
  overrides: [
    {
      files: ['*.mjs'],
      parserOptions: { sourceType: 'module' },
    },
    {
      files: ['*.js'],
      parserOptions: { sourceType: require('./package.json').type === 'module' ? 'module' : 'script' },
    },
    {
      env: { node: false },
      extends: ['./index.js', './react.js', './typescript.js', './warn.js', './prettier.js'],
      files: ['*.ts', '*.tsx'],
      parserOptions: { project: './tsconfig.json' },
    },
  ],
  root: true,
};
