import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  build: {
    transpile: ['vuetify'],
  },
  css: [
    '~/assets/global.scss',
  ],
  modules: [
    'nuxt-icon',
    '@pinia/nuxt',
    '@nuxt/image',
    '@nuxtjs/i18n',
    (_options, nuxt) => {
    nuxt.hooks.hook('vite:extendConfig', (config) => {
      // @ts-expect-error
      config.plugins.push(vuetify({ autoImport: true }))
    })
  },],
  image: {
    inject: true,
  },
  i18n: {
    locales: [
      {code: 'vi', name: 'Vietnamese'},
      {code: 'en', name: 'English'}
    ],
    defaultLocale: 'vi',
    detectBrowserLanguage: false,
    strategy: 'no_prefix',
    vueI18n: "~/locales/i18n.config.ts",
  },
  alias: {
    pinia: "/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs"
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
})
