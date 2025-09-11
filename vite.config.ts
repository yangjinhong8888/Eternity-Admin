import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        host: '0.0.0.0', // 允许局域网访问
        port: 5173,
        allowedHosts: [], // 可配置允许的hostname
    },
    css: {
        preprocessorOptions: {
            less: {
                additionalData: `@import "@/assets/styles/common.less";`
            }
        },
        transformer: 'lightningcss',
        lightningcss: {
            // 可选配置项，例如：
            targets: {
                android: 64,
                chrome: 64,
                edge: 79,
                firefox: 67,
                safari: 12
            },
        }
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, './src'),
            "@assets": path.resolve(__dirname, './src/assets'),
        }
    }
})
