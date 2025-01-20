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
    'flex-center': 'flex justify-center items-center',
    'flex-between':'flex justify-between items-center',
  }
})