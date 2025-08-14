import { defineConfig, globalIgnores } from 'eslint/config';
import react from 'eslint-config-zakodium/react';
import ts from 'eslint-config-zakodium/ts';
import storybook from 'eslint-plugin-storybook';

export default defineConfig(
  globalIgnores(['lib', 'storybook-static']),
  react,
  ts,
  storybook.configs['flat/recommended'],
);
