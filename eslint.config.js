import rational, { flatConfigBuilder } from './lib/index.js';

/**
 * @type {Linter.FlatConfig[]}
 */
export default flatConfigBuilder()
  .use(rational)
  .use({
    rules: {
      'import/no-extraneous-dependencies': 'off',
    },
  })
  .ignore('**/{lib,dist,out,coverage}')
  .build();
