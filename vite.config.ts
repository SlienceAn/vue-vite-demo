import { defineConfig } from 'vite'
import plugins from './plugins'
import path from 'path'

export default defineConfig((config) => {
  const { mode } = config
  return {
    plugins,
    server: {
      open: false,
      port: 6969,
      host: '0.0.0.0',
      proxy: {
        '/api': {
          target: 'https://vue-vite-demo-api-express.vercel.app',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    build: {
      outDir: 'dist',
      assetsDir: 'static/img/',
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/chunk/[name].js',
          entryFileNames: 'static/js/entry/[name].js',
          assetFileNames: 'static/[ext]/[name].[ext]',
          //手動拆分node_modules檔案
          manualChunks(id) {
            if (id.includes('node_modules')) {
              const arr = id.toString().split('node_modules/.pnpm/')[1].split('/')[0].replace(/^@/, '').replace(/\+/g, '_')
              const modules = arr.split('@')[0]
              switch (modules) {
              case 'axios':
              case 'element-plus':
              case 'dayjs':
              case 'lodash-es':
              case 'ctrl_tinycolor':
                return modules
              default:
                return 'vendor'
              }
            }
          }
        }
      },
      minify: 'esbuild',
      target: 'esnext'
    },
    resolve: {
      alias: {
        //路徑別名
        '@': path.resolve(__dirname, './src'),
        '@components': path.resolve(__dirname, './src/components'),
        '@api': path.resolve(__dirname, './src/api'),
        '@untils': path.resolve(__dirname, './src/untils'),
        '@mock':path.resolve(__dirname,'./mock')
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    },
    esbuild: {
      drop: mode === 'production' ? ['console', 'debugger'] : []
    }
  }
})
