export default defineNuxtPlugin((nuxtApp) => {
    const exchange = 24000
    nuxtApp.provide('filter', {
        unitPrice: (price: number | string, locale: string = 'vi') => {
            if(locale == 'en') {
                return '$'+price
            } else if(locale == 'vi') {
                return (+price*exchange).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')+'₫'
            }
        }
    })
})