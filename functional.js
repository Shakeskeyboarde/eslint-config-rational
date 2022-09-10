module.exports = {
  plugins: ['functional'],
  rules: {
    'functional/no-class': 'warn',
    'functional/no-this-expression': 'warn',
    'functional/prefer-readonly-type': ['warn', { allowLocalMutation: true }],
  },
};
