import stylisticPlugin from '@stylistic/eslint-plugin';
import { type Linter } from 'eslint';

import { flatConfigBuilder } from '../config.js';

export interface StylisticOptions {
  files?: string[];
}

/**
 * ESLint configuration for `@stylistic/eslint-plugin`.
 */
export default ({ files }: StylisticOptions = {}): Linter.FlatConfig[] => {
  return flatConfigBuilder()
    .use({
      ...stylisticPlugin.configs.customize({
        indent: 2,
        quoteProps: 'as-needed',
        arrowParens: true,
        semi: true,
        flat: true,
      }),
      files,
    })
    .use({
      files,
      rules: {
        '@stylistic/array-bracket-newline': ['warn', 'consistent'],
        '@stylistic/function-call-spacing': ['warn'],
        '@stylistic/function-call-argument-newline': ['warn', 'consistent'],
        '@stylistic/function-paren-newline': ['warn', 'multiline-arguments'],
        '@stylistic/generator-star-spacing': ['warn', 'before'],
        '@stylistic/implicit-arrow-linebreak': ['warn'],
        '@stylistic/jsx-child-element-spacing': ['warn'],
        '@stylistic/linebreak-style': ['warn', 'unix'],
        '@stylistic/max-len': ['warn', {
          code: 120,
          tabWidth: 2,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreRegExpLiterals: true,
        }],
        '@stylistic/newline-per-chained-call': ['warn', { ignoreChainWithDepth: 3 }],
        '@stylistic/object-curly-newline': ['warn', { multiline: true, consistent: true }],
        '@stylistic/object-property-newline': ['warn', { allowAllPropertiesOnSameLine: true }],
        '@stylistic/quotes': ['warn', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
      },
    })
    .build();
};
