/**
 * I want to create a form rule composable to reuse in any component,
 * however, I cannot translate my error message because i18n cannot be used outside component's <script setup>.
 * So I created a workaround by defining a $rule instance in nuxtApp as a plugin so that I can use nuxtApp's i18n here
 */
export default defineNuxtPlugin((nuxtApp) => {
    const i18n = nuxtApp.$i18n
    nuxtApp.provide('rule', {
        // @ts-ignore
        required: (value: string) => !!value || i18n.t('This field is required')
    })
})