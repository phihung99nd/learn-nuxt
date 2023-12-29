import mitt from "mitt";
const emitter = mitt();

/**
 * Nuxt 3 do not have a createApp() to create a bus, so we use 3rd library mitt as plugin
 */

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.provide('bus', {
        $on: emitter.on,
        $emit: emitter.emit,
    })
})