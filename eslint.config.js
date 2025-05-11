import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import css from '@eslint/css'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import stylelint from 'stylelint'
import { defineConfig } from 'eslint/config'

// 定义一个自定义的处理器来处理 SCSS 文件
const scssProcessor = {
  preprocess: (text) => {
    return [text]
  },
  postprocess: (messages) => {
    return messages[0]
  },
  supportsAutofix: true,
}

export default defineConfig([
  {
    ignores: ['node_modules', 'dist', 'public'],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,vue}'],
    plugins: { js },
    extends: ['js/recommended'],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,vue}'],
    languageOptions: { globals: globals.browser },
  },
  tseslint.configs.recommended,
  pluginVue.configs['flat/essential'],
  {
    files: ['**/*.vue'],
    languageOptions: { parserOptions: { parser: tseslint.parser } },
    rules: {
      'vue/multi-word-component-names': [
        'off',
        {
          ignores: ['index'], // 需要忽略的组件名
        },
      ],
      'no-console': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_', // 忽略以 _ 开头的参数
        },
      ],
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    files: ['**/*.css'],
    plugins: { css },
    language: 'css/css',
    extends: ['css/recommended'],
  },
  {
    files: ['**/*.{scss}'],
    plugins: {
      stylelint: {
        processors: {
          '.scss': scssProcessor,
        },
        rules: stylelint.rules,
      },
    },
    languageOptions: {
      parser: stylelint.parse,
      parserOptions: {
        syntax: 'scss',
      },
    },
    rules: {
      'scss/at-rule-no-unknown': 'error',
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
    },
  },
  eslintPluginPrettierRecommended,
])
