// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@unocss/nuxt',
    '@nuxtjs/color-mode',
  ],
  colorMode: {
    classSuffix: '',
  },
  app: {
    head: {
      titleTemplate: 'Picross',
      htmlAttrs: {
        lang: 'en-US',
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },
  typescript: {
    typeCheck: true,
  },
  devtools: { enabled: true },
  vite: {
    build: {
      minify: 'esbuild',
      cssMinify: 'esbuild',
    },
    optimizeDeps: {
      include: [
        'typescript',
      ],
    },
  },
})
