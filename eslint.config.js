import js from "@eslint/js"
import globals from "globals"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import tseslint from "typescript-eslint"
import prettier from "eslint-config-prettier"
import { globalIgnores } from "eslint/config"

/**
 * ESLint 配置
 *
 * 导出一个 ESLint 配置数组，包含针对 TypeScript 和 React 项目的规则集
 * 配置了对 JavaScript、TypeScript、React Hooks 和 React Refresh 的支持
 * 同时集成了 Prettier 来确保代码风格一致性
 */
export default tseslint.config([
  // 全局忽略 dist 目录，该目录通常包含构建后的文件
  globalIgnores(["dist"]),
  {
    // 针对所有 .ts 和 .tsx 文件应用配置
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended, // ESLint 推荐的 JavaScript 规则
      tseslint.configs.recommended, // TypeScript 推荐规则
      reactHooks.configs["recommended-latest"], // React Hooks 推荐规则
      reactRefresh.configs.vite, // React Refresh 规则，适用于 Vite 环境
      prettier, // 添加 Prettier 配置，确保 ESLint 不会与 Prettier 冲突
    ],
    languageOptions: {
      ecmaVersion: 2020, // 使用 ECMAScript 2020 语法
      globals: globals.browser, // 定义浏览器全局变量
    },
  },
])
