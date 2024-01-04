import { useSingleton } from './utils'
import type { Movie } from '~/types'

export const getTrailer = (item: Movie) => {
    // @ts-ignore
    const trailer = item.videos?.results?.find(video => video.type === 'Trailer')
    return getVideoLink(trailer)
}

export const getVideoLink = (item: any) => {
    return `https://www.youtube.com/embed/${item.key}?rel=0&showinfo=0&autoplay=0`
}

const [
    provideVideoModal,
    useVideoModal,
] = useSingleton<(link: string) => void>()

const [
    provideImageModal,
    useImageModal,
] = useSingleton<(link: string) => void>()

const [
    provideIFrameModal,
    useIFrameModal,
] = useSingleton<(link: string) => void>()

export {
    provideVideoModal,
    useVideoModal,
    provideImageModal,
    useImageModal,
    provideIFrameModal,
    useIFrameModal
}