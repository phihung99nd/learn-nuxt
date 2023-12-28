// import this after install `@mdi/font` package
import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { createVueI18nAdapter } from "vuetify/locale/adapters/vue-i18n";

export default defineNuxtPlugin((app) => {
    const i18n = { global: app.$i18n };
    const vuetify = createVuetify({
        ssr: true,
        theme: {
            defaultTheme: 'light'
        },
        icons: {
            defaultSet: 'mdi', // This is already the default value - only for display purposes
        },
        locale: {
            // adapt VuetifyI18n with nuxt/i18n
            adapter: createVueI18nAdapter({ i18n, useI18n }),
        },
    })
    app.vueApp.use(vuetify)
})