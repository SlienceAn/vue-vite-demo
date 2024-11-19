import vue from '@vitejs/plugin-vue'
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
import UnoCSS from 'unocss/vite'

export default [
  vue(),
  vueJsx(),
  UnoCSS(),
  AutoImport({
    include: [
      /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
      /\.vue$/, /\.vue\?vue/, // .vue
    ],
    imports: [
      'vue',
      'vue-router',
      '@vueuse/core',
      'pinia',
      {
        'vite-plugin-mock': [
          ['MockMethod', 'type'] // 導入 MockMethod type
        ]
      },
    ],
    dirs: [
      '../src/store',
      '../mock'
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
    mockPath: 'mock',
    localEnabled: true,//開發打包開關
    prodEnabled: true,//生產打包開關
    // injectCode: ` error
    // import { setupProdMockServer } from './src/mockProdServer';
    // setupProdMockServer();
    // `,
    logger: true,//是否在控制台顯示請求日誌
    injectFile: path.resolve('./src/main.ts'),
  })

]