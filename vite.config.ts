import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import AutoImportComponents from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Checker from 'vite-plugin-checker'
import eslint from 'vite-plugin-eslint'
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default defineConfig((config) => {
  const { mode } = config
  return {
    build:{
      outDir:'dist',
      assetsDir:'static/img/',
      rollupOptions:{
        output:{
          chunkFileNames:'static/js/chunk/[name]-[hash].js',
          entryFileNames:'static/js/entry/[name]-[hash].js',
          assetFileNames:'static/[ext]/[name]-[hash].[ext]'
        }
      }
    },
    plugins: [
      vue(),
      vueJsx(),
      WindiCSS(),
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/, /\.vue\?vue/, // .vue
        ],
        imports: [
          'vue',
          'vue-router',
          '@vueuse/core',
          'pinia'
        ],
        dirs: [
          './src/store'
        ],
        dts: './auto-imports.d.ts',
        vueTemplate: false,
        eslintrc: {
          enabled: true,
          filepath: './.eslintrc-auto-import.json',
          globalsPropValue: true,
        }
      }),
      AutoImportComponents({
        dirs: [path.resolve(__dirname, '/src/components')],
        deep: true,
        extensions: ['vue'],
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({
            customCollections: [
              'custom',
            ]
          })
        ],
        allowOverrides: false,
        // filters for transforming targets
        include: [/\.vue$/, /\.vue\?vue/, /\.[tj]sx?$/],
        exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
      }),
      //導入icon集
      Icons({
        customCollections: {
          custom: FileSystemIconLoader(path.resolve(__dirname, '/src/assets/icons'))
        }
      }),
      eslint({
        include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue']
      }),
      Checker({
        vueTsc: true
      }),
      //mock api config
      viteMockServe({
        mockPath: './mock',
        localEnabled: true,//開發打包開關
        prodEnabled: true,//生產打包開關
        // injectCode: ` error
        // import { setupProdMockServer } from './src/mockProdServer';
        // setupProdMockServer();
        // `,
        logger: true,//是否在控制台顯示請求日誌
        injectFile: path.resolve('./src/main.ts'),
      })
    ],
    resolve: {
      alias: {
        //路徑別名
        '@': path.resolve(__dirname, './src'),
        '@components': path.resolve(__dirname, './src/components'),
        '@api': path.resolve(__dirname, './src/api'),
        '@untils':path.resolve(__dirname,'./src/untils')
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    },
    esbuild: {
      drop: mode === 'production' ? ['console', 'debugger'] : []
    }
  }
})
