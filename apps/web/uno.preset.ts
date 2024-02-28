import {
  definePreset,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
} from 'unocss'

export default definePreset({
  name: 'web-preset',
  safelist: 'w-6 w-12 w-18 h-6 h-12 h-18 text-red text-blue'.split(' '),
  shortcuts: [
    {
      'border-base': 'border-gray-200 dark:border-gray-800',
      'border-cell': 'border-gray-200 dark:border-secondary',
      'bg-base': 'bg-white dark:bg-[#070F2B]',
      'bg-active': 'bg-gray:10',
      'bg-faded': 'bg-gray:5',
      'bg-cell': 'bg-[#070F2B] dark:bg-gray',
      'bg-hint': 'bg-gray:10 dark:bg-gray:20',
      'bg-hint-focus': 'bg-tertiary:40 dark:bg-tertiary:60',
      'select-base': 'bg-gray:10 p-2 rounded',
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
})
