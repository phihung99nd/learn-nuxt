const exchange = 24000
const movieBaseUrl = 'https://movies-proxy.vercel.app/ipx/fit_cover/tmdb'

export const unitPrice = (price: number | string, locale: string = 'vi') => {
    if(locale == 'en') {
        return '$'+price
    } else if(locale == 'vi') {
        return (+price*exchange).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')+'₫'
    }
}

export const provideImgUrl = (path: string) =>  {
    return movieBaseUrl+path
}

export const formatRating = (rate: number) => {
    return Intl.NumberFormat('en-GB', { notation: 'compact', maximumFractionDigits: 1 }).format(rate)
}

/**
 * Create provide and inject for global singleton such as dialog component
 */
export function useSingleton<T>() {
    const key = Symbol('singleton')
    return [
        function provide(v: T) {
            const vm = getCurrentInstance()
            vm?.appContext.app.provide(key, v)
        },
        function use(fallback?: T) {
            return inject(key, fallback) as T
        },
    ] as const
}