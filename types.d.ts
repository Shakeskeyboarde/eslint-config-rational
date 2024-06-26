declare module 'eslint-plugin-react' {
  import type { ESLint } from '@eslint/js';
  const value: ESLint.Plugin;
  export default value;
}

declare module 'eslint-plugin-react/configs/jsx-runtime.js' {
  import type { Linter } from 'eslint';
  const value: Linter.FlatConfig;
  export default value;
}

declare module 'eslint-plugin-react/configs/recommended.js' {
  import type { Linter } from 'eslint';
  const value: Linter.FlatConfig;
  export default value;
}

declare module 'eslint-plugin-unicorn' {
  import type { ESLint } from 'eslint';
  const value: ESLint.Plugin;
  export default value;
}
