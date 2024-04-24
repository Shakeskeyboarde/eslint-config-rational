import stylisticPlugin from '@stylistic/eslint-plugin';

import { createConfigFactory, type NestedConfigs } from '../config.js';

/**
 * ESLint configuration for `@stylistic/eslint-plugin`.
 */
export const stylistic = createConfigFactory<{
  files: string[];
}>(({ files }): NestedConfigs => {
  return [
    { files, ...stylisticPlugin.configs['disable-legacy'] },
    { files, ...stylisticPlugin.configs.customize({ flat: true, semi: true }) },
    {
      files,
      rules: {
        '@stylistic/array-bracket-newline': ['warn', 'consistent'],
        '@stylistic/arrow-parens': ['warn', 'always'],
        '@stylistic/function-call-spacing': ['warn'],
        '@stylistic/function-call-argument-newline': ['warn', 'consistent'],
        '@stylistic/function-paren-newline': ['warn', 'multiline-arguments'],
        '@stylistic/generator-star-spacing': ['warn', 'before'],
        '@stylistic/implicit-arrow-linebreak': ['warn'],
        '@stylistic/indent': ['error', 2],
        '@stylistic/indent-binary-ops': ['error', 2],
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
        '@stylistic/quote-props': ['warn', 'as-needed'],
        '@stylistic/quotes': ['warn', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
        '@stylistic/yield-star-spacing': ['warn', 'after'],
      },
    },
  ];
});
