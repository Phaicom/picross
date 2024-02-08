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
  shortcuts: {},
  theme: {
    colors: {
      primary: {
        DEFAULT: '#00c16a',
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
