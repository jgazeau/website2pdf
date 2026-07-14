'use strict';
const gtsConfig = require('./node_modules/gts/build/src/index.js');
const {defineConfig} = require('eslint/config');

module.exports = defineConfig([
  ...gtsConfig,
  {
    ignores: ['build/', 'scripts/'],
  },
  {
    files: ['test/**/*.ts'],
    rules: {
      '@typescript-eslint/no-unused-expressions': 'off',
    },
  },
]);
