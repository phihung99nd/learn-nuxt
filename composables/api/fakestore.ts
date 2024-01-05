import {createRequest} from "~/composables/api/request.base";

const apiBaseUrl = 'https://fakestoreapi.com/products'

const [ request ] = createRequest(apiBaseUrl)

// Fetch product list
export function getProductList(params: object) {
    return request('/', {...params})
}

// Fetch single product detail by id
export function getProductById(id: string) {
    return request(`/${id}`)
}