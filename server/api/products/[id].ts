import {baseUrl} from "~/server/constants";

/**
 * API relate to /products/:id endpoint
 */
export default defineEventHandler(async (event) => {
    const method = getMethod(event)
    const query = getQuery(event)
    const body = readBody(event)
    const params = getRouterParams(event)
    switch (method) {
        case "GET":
            return await $fetch(`${baseUrl}/products/${params.id}`, {
                method,
                query
            })
        case "PUT":
            return await $fetch(`${baseUrl}/products/${params.id}`, {
                method,
                query,
                body
            })
    }
})