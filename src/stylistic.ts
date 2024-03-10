import stylistic from '@stylistic/eslint-plugin';

import { configFactory } from './utils/config.js';

export default configFactory<{
  readonly files: readonly string[];
}>(({ files }) => {
  return [
    { files, ...stylistic.configs['disable-legacy'] },
    { files, ...stylistic.configs.customize({ flat: true, semi: true }) },
    {
      files,
      rules: {
        '@stylistic/array-element-newline': ['warn', 'consistent'],
        '@stylistic/array-bracket-newline': ['warn', 'consistent'],
        '@stylistic/arrow-parens': ['warn', 'always'],
        '@stylistic/function-call-spacing': ['warn'],
        '@stylistic/function-call-argument-newline': ['warn', 'consistent'],
        '@stylistic/function-paren-newline': ['warn', 'multiline-arguments'],
        '@stylistic/generator-star-spacing': ['warn'],
        '@stylistic/implicit-arrow-linebreak': ['warn'],
        '@stylistic/jsx-child-element-spacing': ['warn'],
        '@stylistic/linebreak-style': ['warn', 'unix'],
        '@stylistic/max-len': ['warn', {
          code: 120,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreRegExpLiterals: true,
        }],
        '@stylistic/newline-per-chained-call': ['warn', { ignoreChainWithDepth: 1 }],
        '@stylistic/object-curly-newline': ['warn', { multiline: true, consistent: true }],
        '@stylistic/object-property-newline': ['warn', { allowAllPropertiesOnSameLine: true }],
        '@stylistic/quote-props': ['warn', 'as-needed'],
        '@stylistic/quotes': ['warn', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
      },
    },
  ];
});
