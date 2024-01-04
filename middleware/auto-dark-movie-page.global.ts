/**
 * Change to dark mode when watching movie
 */
export default defineNuxtRouteMiddleware(to => {
    const app = useNuxtApp()
    if(to.fullPath.includes('movies')) {
        app.vueApp._context.provides[Symbol.for('vuetify:theme')].global.name.value = 'dark'
    } else {
        app.vueApp._context.provides[Symbol.for('vuetify:theme')].global.name.value = 'light'
    }
})