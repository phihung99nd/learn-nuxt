// Data provided by [The Movie Database](https://www.themoviedb.org).
//
import type {Ref} from "vue";

const apiBaseUrl = 'https://movies-proxy.vercel.app'

async function request(url: string, params: object = {}, watch: any[] = []) {
    return await $fetch(url, {
        baseURL: `${apiBaseUrl}/tmdb`,
        params,
    })
}

export function getMovieList(page: number) {
    return request('movie/popular', {page})
}

export function getMovieById(id: number) {
    return request(`movie/${id}`,{
        append_to_response: 'videos,credits,images,external_ids,release_dates,combined_credits',
        include_image_language: 'en',
    })
}