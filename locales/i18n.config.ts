import en from "./en"
import vi from "./vi"

export default defineI18nConfig(() => ({
    legacy: false,
    messages: {
        "en": en,
        "vi": vi
    }
}))