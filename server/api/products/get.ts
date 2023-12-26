import {baseUrl} from "~/server/constants";

/**
 * API GET products
 */
export default defineEventHandler(async (event) => {
    const method = 'GET' // use getMethod(event) to override this with method from caller
    const params = getQuery(event)
    return await $fetch(`${baseUrl}/products`, {
        method,
        params
    })
})