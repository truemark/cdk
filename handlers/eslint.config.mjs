import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

const config = tseslint.config(
  {
    ignores: [
      'dist',
      'node_modules',
      '**/*.js',
      '**/*.mjs',
      '**/*.d.*',
      '**/*.map',
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
);
export default config;
