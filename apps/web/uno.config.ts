import {
  defineConfig,
  transformerDirectives,
} from 'unocss'

import preset from './uno.preset'

export default defineConfig({
  presets: [preset],
  transformers: [
    transformerDirectives(),
  ],
})
