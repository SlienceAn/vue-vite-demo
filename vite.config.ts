import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import path from 'path'
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    WindiCSS(),
    viteMockServe({
      mockPath: './mock',
      localEnabled: true,//開發打包開關
      prodEnabled: true,//生產打包開關
      // injectCode: ` error
      // import { setupProdMockServer } from './src/mockProdServer';
      // setupProdMockServer();
      // `,
      logger: true,//是否在控制台顯示請求日誌
      injectFile: path.resolve("./src/main.ts"),
    })
  ],
  resolve: {
    alias: {
      //路徑別名
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@api': path.resolve(__dirname, "./src/api")
    }
  },
  server: {
    host: true,
    port: 5173
  }
})
