import { defineConfig } from 'unocss'
import presetUno from '@unocss/preset-uno'
import presetAttributify from '@unocss/preset-attributify'
import transformerDirectives from '@unocss/transformer-directives'

export default defineConfig({
  presets: [
    presetUno({
      dark: 'class',
      preflight: true,
    }),
    presetAttributify()
  ],
  transformers: [
    transformerDirectives()
  ],
  theme: {
    breakpoints: {
      xs: '768px',
      sm: '768px',
      md: '992px',
      lg: '1280px',
      xl: '1920px'
    },
  },
  shortcuts: {
    center: 'flex justify-center items-center',
    btn: 'py-2 px-4 font-semibold rounded-lg shadow-md text-white',
    input: 'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline',
    select: 'shadow bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded block w-full py-2 px-3',
    'title-label': 'block text-gray-700 text-sm font-bold mb-2'
  }
})