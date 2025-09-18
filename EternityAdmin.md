# React + TypeScript + Vite

这个模板提供了一个最小的设置，让React在Vite中使用HMR和一些ESLint规则工作。

目前，有两个官方插件可用：

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) 使用 [Babel](https://babeljs.io/) 用于快速刷新
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) 使用 [SWC](https://swc.rs/) 用于快速刷新

## 扩展ESLint配置

如果你正在开发一个生产应用程序，我们建议更新配置以启用类型感知的lint规则：

```js
export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

你也可以安装 [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) 和 [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) 来获取特定于react的lint规则：

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x"
import reactDom from "eslint-plugin-react-dom"

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

## 开发所需配置

```pnpm
使用pnpm时务必在.npmrc中配置包提升，否则可能遇到eslint无法正常使用的情况
# 基础策略
auto-install-peers = true
node-linker = isolated

# 必要提升项
public-hoist-pattern[] = *eslint*
public-hoist-pattern[] = @typescript-eslint/*
public-hoist-pattern[] = eslint-plugin-*
public-hoist-pattern[] = *prettier*
public-hoist-pattern[] = *babel*
public-hoist-pattern[] = *jest*

# 仅当遇到工具链兼容性问题时启用
# node-linker = hoisted
```
