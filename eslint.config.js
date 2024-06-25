import rational, { flatConfigBuilder } from './lib/index.js';

/**
 * @type {Linter.FlatConfig[]}
 */
export default flatConfigBuilder()
  .use(rational)
  .ignore('**/{lib,dist,out,coverage}')
  .build();
