import enLocal from "./en"
import viLocal from "./vi"
import { en, vi } from 'vuetify/locale'

export default defineI18nConfig(() => ({
    legacy: false,
    messages: {
        "en": {
            ...enLocal,
            $vuetify: {
                ...en
            },
        },
        "vi": {
            ...viLocal,
            $vuetify: {
                ...vi
            },
        }
    }
}))