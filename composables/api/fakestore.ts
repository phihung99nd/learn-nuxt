import { LRUCache } from 'lru-cache'
import { hash as ohash } from 'ohash'

const apiBaseUrl = 'https://fakestoreapi.com'

const promiseCache = new LRUCache<string, any>({
    max: 500, // cache maximum [max] items
    ttl: 2000 * 60 * 60, // item live in 2 hour
})

async function _request(url: string, params: object = {}) {
    return await $fetch(url, {
        baseURL: `${apiBaseUrl}/products`,
        params,
    })
}

/**
 * API fetching result memoization
 * @param url
 * @param params
 */
export function request(url: string, params: object = {}) {
    const hash = ohash([url, params])

    // Nuxt API useState create a reactive state and set default value
    const state = useState<any>(hash, () => null)
    if (state.value)
        return state.value
    if (!promiseCache.has(hash)) { // Cache result of fetch
        promiseCache.set(
            hash,
            _request(url, params)
                .then((res) => {
                    state.value = res
                    return res
                })
                .catch((e) => {
                    promiseCache.delete(hash)
                    throw e
                }),
        )
    }
    return promiseCache.get(hash)!
}

// Fetch product list
export function getProductList(params: object) {
    return request('/', {...params})
}

// Fetch single product detail by id
export function getProductById(id: string) {
    return request(`/${id}`)
}