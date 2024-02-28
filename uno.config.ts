import {
  defineConfig,
  transformerDirectives,
} from 'unocss'

import preset from './apps/web/uno.preset'

export default defineConfig({
  presets: [preset],
  transformers: [
    transformerDirectives(),
  ],
})
