export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Picross - phaicom.space',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  styleResources: {
    scss: ['~/assets/scss/_include-media.scss'],
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/theme.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://composition-api.nuxtjs.org/
    '@nuxtjs/composition-api/module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://google-fonts.nuxtjs.org
    [
      '@nuxtjs/google-fonts',
      {
        families: {
          Roboto: true,
          'Josefin+Sans': true,
          Lato: [100, 300],
          Raleway: {
            wght: [100, 400],
            ital: [100],
          },
        },
      },
    ],
    '@nuxtjs/style-resources',
    // https://color-mode.nuxtjs.org/
    '@nuxtjs/color-mode',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  colorMode: {
    preference: 'light',
  },
}
