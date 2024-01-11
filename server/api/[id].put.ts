import {TodoList} from "~/server/models/todo.schema";

export default defineEventHandler(async event => {
    try {
        const body = await readBody(event)
        const params = getRouterParams(event)
        if(!body) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Invalid form data',
            })
        }
        await TodoList.findByIdAndUpdate(params.id, body, { runValidators: true, new: true })
    } catch (e) {
        console.error(e);
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong',
        })
    }
})