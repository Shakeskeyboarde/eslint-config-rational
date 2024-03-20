/* eslint-disable jsdoc/require-jsdoc */
declare module 'eslint-plugin-unicorn' {
  import type { ESLint } from 'eslint';
  const value: ESLint.Plugin;
  export default value;
}

declare module 'eslint-plugin-simple-import-sort' {
  import type { ESLint } from 'eslint';
  const value: ESLint.Plugin;
  export default value;
}

declare module '@eslint/eslintrc' {
  import type { Linter } from 'eslint';
  export class FlatCompat {
    constructor(options: { readonly cwd: string });
    plugins(...plugins: readonly string[]): readonly Linter.FlatConfig[];
    extends(...plugins: readonly string[]): readonly Linter.FlatConfig[];
    config(config: Linter.Config): readonly Linter.FlatConfig[];
  }
}
