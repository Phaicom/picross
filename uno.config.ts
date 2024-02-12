import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
} from 'unocss'

export default defineConfig({
  safelist: 'w-6 w-12 w-18 h-6 h-12 h-18'.split(' '),
  shortcuts: {
    'border-base': 'border-gray-200 dark:border-gray-800',
    'bg-base': 'bg-white dark:bg-[#020420]',
    'bg-active': 'bg-gray:10',
    'bg-faded': 'bg-gray:5',
    'bg-cell': 'bg-[#020420] dark:bg-gray',
  },
  theme: {
    colors: {
      primary: {
        DEFAULT: '#61AFEF',
      },
    },
  },
  presets: [
    presetUno(),
    presetIcons(),
    presetAttributify(),
    presetWebFonts({
      provider: 'bunny',
      fonts: {
        sans: {
          name: 'DM Sans',
          weights: [200, 400, 600, 700],
        },
        mono: 'DM Mono',
      },
    }),
    presetTypography(),
  ],
  transformers: [
    transformerDirectives(),
  ],
})
