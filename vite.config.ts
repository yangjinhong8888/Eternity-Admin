import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  // 插件配置
  plugins: [react()],
  // 开发服务器配置
  server: {
    host: "0.0.0.0", // 允许局域网访问
    port: 5173, // 开发服务器端口
    allowedHosts: [], // 可配置允许的hostname
    // 开发服务器代理配置，用于解决开发环境下的跨域问题（同时解决跨域下cookie不能存储）
    // 将 /admin 开头的请求代理到后端服务
    proxy: {
      "/admin/": {
        // 代理目标地址，需要配置实际的后端服务地址
        target: "http://127.0.0.1:8080",
        // 是否改变请求头中的 origin 字段，设置为 true 以适应某些安全策略
        changeOrigin: true,
        // 重写请求路径，移除 /admin 前缀
        rewrite: path => path.replace(/^\/admin/, ""),
      },
    },
  },
  css: {
    // 配置 CSS 预处理器选项
    preprocessorOptions: {
      less: {
        // 为所有 Less 文件注入 common.less 变量和混入
        additionalData: `@import "@/assets/styles/common.less";`,
      },
    },
    // 使用 lightningcss 作为 CSS 处理器，提供更快的编译速度和更小的打包体积
    transformer: "lightningcss",
    lightningcss: {
      // 设置目标浏览器版本，用于自动添加浏览器前缀和转译新特性
      targets: {
        android: 64, // Android 8.0+
        chrome: 64, // Chrome 64+
        edge: 79, // Edge 79+
        firefox: 67, // Firefox 67+
        safari: 12, // Safari 12+
      },
    },
  },
  // 路径定义别名
  resolve: {
    alias: {
      // 设置 @ 指向 src 目录
      "@": path.resolve(__dirname, "./src"),
      // 设置 @assets 指向 src/assets 目录
      "@assets": path.resolve(__dirname, "./src/assets"),
    },
  },
  // 指定环境变量文件所在的目录
  envDir: path.resolve(__dirname, "./src/config/environment"),
  // 设置环境变量的前缀，只有以此前缀开头的变量才会被注入到客户端
  envPrefix: "ETERNITY_",
})
