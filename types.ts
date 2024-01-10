export type CartItem = {
    id: number | string,
    title: string,
    price: number | string,
    category: string,
    description: string,
    image: string,
    quantity: number
}

export type Movie = {
    adult: boolean,
    backdrop_path: string,
    genre_ids: Array<string | number>,
    id: number,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    title: string,
    name: string,
    video: boolean,
    vote_average: number,
    vote_count: number,
}

export type TodoItem = {
    _id: string,
    name: string,
    checked: boolean
}

export type TodoList = {
    _id: string,
    name: string,
    description: string,
    color: string,
    items: Array<TodoItem>
}