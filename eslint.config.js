import { defineConfig, globalIgnores } from 'eslint/config';
import react from 'eslint-config-zakodium/react';
import ts from 'eslint-config-zakodium/ts';
import storybook from 'eslint-plugin-storybook';

export default defineConfig(
  globalIgnores(['lib', 'storybook-static']),
  react,
  ts,
  storybook.configs['flat/recommended'],
  {
    // TODO: Enable those rules
    rules: {
      'react-you-might-not-need-an-effect/no-pass-data-to-parent': 'off',
      'react-hooks/refs': 'off',
      'react-hooks/set-state-in-effect': 'off',
    },
  },
);
