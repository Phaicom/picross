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
  shortcuts: [
    {
      'border-base': 'border-gray-200 dark:border-gray-800',
      'bg-base': 'bg-white dark:bg-[#070F2B]',
      'bg-active': 'bg-gray:10',
      'bg-faded': 'bg-gray:5',
      'bg-cell': 'bg-[#070F2B] dark:bg-gray',
      'border-cell': 'border-gray-200 dark:border-secondary',
      'select-base': 'bg-gray:10 p-2',
    },
    [/^border-cell-(.*)$/, ([, c]) => `border-${c}-secondary dark:border-${c}-tertiary`],
    [/^btn-(.*)$/, ([, c]) => `bg-${c} text-white py-2 px-4 rounded-lg hover:opacity-90 transition-all`],
  ],
  theme: {
    colors: {
      primary: {
        DEFAULT: '#1B1A55',
      },
      secondary: {
        DEFAULT: '#535C91',
      },
      tertiary: {
        DEFAULT: '#9290C3',
      },
      quaternary: {
        DEFAULT: '#070F2B',
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
