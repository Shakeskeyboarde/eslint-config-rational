import rational from './lib/index.js';

export default [
  {
    ignores: ['node_modules/', 'lib/', 'out/', 'dist/', 'coverage/'],
  },
  ...rational({
    enableImports: true,
    enableUnicorn: true,
    enableTypescript: true,
    enableReact: true,
    enablePrettier: true,
  }),
];
