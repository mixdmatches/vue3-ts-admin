import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import prettier from 'eslint-config-prettier'
import pluginPrettier from 'eslint-plugin-prettier'
// globals：提供了预定义的全局变量。
// pluginJs：ESLint 的 JavaScript 插件。
// tseslint：TypeScript ESLint 插件。
// pluginVue：Vue.js ESLint 插件。
// prettier：Prettier 的 ESLint 配置。
// pluginPrettier：Prettier 的 ESLint 插件

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,vue}'], //指定 ESLint 应该检查的文件类型，包括 JavaScript、TypeScript 和 Vue 文件。
    languageOptions: {
      globals: globals.browser, //定义了全局变量，这里使用 globals.browser，表示浏览器环境中的全局变量。
      //指定解析器选项。
      parserOptions: {
        ecmaVersion: 2020, //指定 ECMAScript 版本，这里是 2020。
        sourceType: 'module', //指定代码类型为模块
      },
    },
    rules: {
      'no-console': 'warn', //警告使用 console.log。
      '@typescript-eslint/no-unused-vars': 'warn', //警告未使用的变量。
      '@typescript-eslint/no-explicit-any': 'off', //允许使用 any 类型。
      // //配置 Prettier 规则
      // 'prettier/prettier': [
      //   'error',
      //   {
      //     singleQuote: true, //使用单引号。
      //     semi: false, //不使用分号
      //   },
      // ],
    },
  },
  //使用 JavaScript 插件的推荐配置。
  pluginJs.configs.recommended,
  //使用 TypeScript ESLint 插件的推荐配置。
  ...tseslint.configs.recommended,
  //使用 Vue 插件的基本配置。
  ...pluginVue.configs['flat/essential'],
  //使用 Prettier 的配置和插件推荐配置。
  prettier,
  pluginPrettier.configs.recommended,
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
    rules: {
      'vue/multi-word-component-names': [
        'off',
        {
          ignores: ['index'], // 需要忽略的组件名
        },
      ],
    },
  },
]
