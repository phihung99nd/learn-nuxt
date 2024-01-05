// Data provided by [The Movie Database](https://www.themoviedb.org).
//
import {createRequest} from "~/composables/api/request.base";

const apiBaseUrl = 'https://movies-proxy.vercel.app/tmdb'

const [ request ] = createRequest(apiBaseUrl)

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