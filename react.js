/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ['plugin:react/recommended', 'plugin:react/jsx-runtime', 'plugin:react-hooks/recommended'],
  settings: { react: { version: 'detect' } },
};
