import {LRUCache} from "lru-cache";
import {hash as ohash} from "ohash";

const promiseCache = new LRUCache<string, any>({
    max: 500, // cache maximum [max] items
    ttl: 2000 * 60 * 60, // item live in 2 hour
})

async function _request(baseUrl: string, url: string, params: object = {}) {
    return await $fetch(url, {
        baseURL: baseUrl,
        params,
    })
}

/**
 * API fetching result memoization
 * @param baseUrl
 * @param url
 * @param params
 */
async function cacheRequest(baseUrl: string, url: string, params: object = {}) {
    const hash = ohash([url, params])

    // Nuxt API useState create a reactive state and set default value
    const state = useState<any>(hash, () => null)
    if (state.value)
        return state.value
    if (!promiseCache.has(hash)) { // Cache result of fetch
        promiseCache.set(
            hash,
            _request(baseUrl, url, params)
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

export function createRequest(baseUrl: string) {
    return [
        function request(url: string, params: object = {}) {
            return cacheRequest(baseUrl, url, params)
        }
    ] as const
}