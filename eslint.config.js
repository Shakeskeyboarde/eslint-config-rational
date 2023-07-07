import rational from './lib/index.js';

export default [
  {
    ignores: ['**/node_modules/', '**/lib/', '**/out/', '**/dist/'],
  },
  ...rational(),
];
