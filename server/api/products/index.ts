import {baseUrl} from "~/server/constants";

/**
 * API relate to /products endpoint
 */
export default defineEventHandler(async (event) => {
    const method = getMethod(event)
    const query = getQuery(event)
    const body = readBody(event)
    switch (method) {
        case "GET":
            return await $fetch(`${baseUrl}/products`, {
                method,
                query
            })
        case "POST":
            return await $fetch(`${baseUrl}/products`, {
                method,
                query,
                body
            })
    }
})