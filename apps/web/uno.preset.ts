import {
  definePreset,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
} from 'unocss'

export default definePreset({
  name: 'web-preset',
  // safelist: 'w-6 w-12 w-18 h-6 h-12 h-18 text-red text-blue'.split(' '),
  shortcuts: [
    {
      // 'border-base': 'border-gray-200 dark:border-gray-800',
      // 'border-cell': 'border-gray-200 dark:border-secondary',
      'bg-base': 'bg-white',
      'btn': 'rounded transition-all duration-200 text-[12px] h-28px w-60px inline-flex shrink-0 flex-wrap cursor-pointer select-none items-center justify-center text-center font-600 decoration-none',
      'border-cell': 'border-solid border-my-light-gray',
      'bg-cell': 'bg-my-light-gray',
      // 'bg-active': 'bg-gray:10',
      // 'bg-faded': 'bg-gray:5',
      // 'bg-cell': 'bg-[#070F2B] dark:bg-gray',
      // 'bg-hint': 'bg-gray:10 dark:bg-gray:20',
      // 'bg-hint-focus': 'bg-tertiary:40 dark:bg-tertiary:60',
      // 'select-base': 'bg-gray:10 p-2 rounded',
    },
    // [/^border-cell-(.*)$/, ([, c]) => `border-${c}-secondary dark:border-${c}-tertiary`],
    // my-blue hover:my-blue-60 active:my-blue-120
    [/^btn-(.*)$/, ([, c]) => `bg-${c} hover:bg-${c}-60 active:bg-${c}-120 text-white`],
  ],
  theme: {
    colors: {
      my: {
        blue: {
          DEFAULT: '#4B69FF',
          120: '#2D41A7',
          60: '#93A5FF',
        },
        red: {
          DEFAULT: '#EE7070',
          120: '#A24646',
          60: '#F5A9A9',
        },
        sky: {
          blue: {
            DEFAULT: '#95C5FF',
          },
        },
        gray: {
          DEFAULT: '#919191',
        },
        dark: {
          blue: {
            DEFAULT: '#081038',
          },
          violet: {
            80: '#070F2B',
            70: '#1B1A55',
          },
        },
        light: {
          violet: {
            20: '#DBE1FF',
            10: '#ECF0FF',
          },
          gray: {
            DEFAULT: '#ECECEC',
          },
        },
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
        inter: {
          name: 'Inter',
          weights: [200, 400, 600, 700],
        },
      },
    }),
  ],
})
