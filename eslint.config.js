import { defineConfig } from 'eslint/config';
import react from 'eslint-config-zakodium/react';
import ts from 'eslint-config-zakodium/ts';
import storybook from 'eslint-plugin-storybook';

export default defineConfig(react, ts, storybook.configs['flat/recommended']);
