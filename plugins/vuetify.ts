// import this after install `@mdi/font` package
import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default defineNuxtPlugin((app) => {
    const vuetify = createVuetify({
        ssr: true,
        theme: {
            defaultTheme: 'light'
        },
        icons: {
            defaultSet: 'mdi', // This is already the default value - only for display purposes
        },
    })
    app.vueApp.use(vuetify)
})