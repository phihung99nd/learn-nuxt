// Data provided by [The Movie Database](https://www.themoviedb.org).
//
import { LRUCache } from 'lru-cache'
import { hash as ohash } from 'ohash'

const apiBaseUrl = 'https://movies-proxy.vercel.app'

const promiseCache = new LRUCache<string, any>({
    max: 500, // cache maximum [max] items
    ttl: 2000 * 60 * 60, // item live in 2 hour
})

async function _request(url: string, params: object = {}) {
    return await $fetch(url, {
        baseURL: `${apiBaseUrl}/tmdb`,
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

// Fetch movie list
export function getMovieList(page: number) {
    return request('movie/popular', {page})
}

// Fetch single movie detail by id
export function getMovieById(id: number) {
    return request(`movie/${id}`,{
        append_to_response: 'videos,credits,images,external_ids,release_dates,combined_credits',
        include_image_language: 'en',
    })
}