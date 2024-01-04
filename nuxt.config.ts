import vuetify, {transformAssetUrls} from 'vite-plugin-vuetify'

const movieBaseUrl = 'https://movies-proxy.vercel.app'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    // @ts-ignore
    app: {
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
        },
        pageTransition: false,
        layoutTransition: false
    },
    devtools: {enabled: true},
    build: {
        transpile: ['vuetify'],
    },
    css: [
        '~/assets/global.scss',
    ],
    imports: {
        dirs: [
            // Scan top-level modules
            'composables',
            // ... or scan modules nested one level deep with a specific name and file extension
            'composables/*/index.{ts,js,mjs,mts}',
            // ... or scan all modules within given directory
            'composables/**'
        ]
    },
    modules: [
        'nuxt-icon',
        '@pinia/nuxt',
        '@nuxt/image',
        '@nuxtjs/i18n',
        (_options, nuxt) => {
            nuxt.hooks.hook('vite:extendConfig', (config) => {
                // @ts-expect-error
                config.plugins.push(vuetify({autoImport: true}))
            })
        },],
    experimental: {
        viewTransition: true,
    },
    image: {
        inject: true,
        // https://image.nuxt.com/advanced/custom-provider
        provider: 'proxy',
        providers: {
            proxy: {
                provider: 'ipx',
                options: {
                    baseURL: `${movieBaseUrl}/ipx`,
                },
            },
        },
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
        // https://nuxt.com/docs/getting-started/assets#global-styles-imports
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@use "~/assets/variables.scss" as *;',
                },
            },
        },
    },
})
