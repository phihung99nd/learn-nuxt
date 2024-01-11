import {TodoItem, TodoList} from "~/server/models/todo.schema";

export default defineEventHandler(async event => {
    try {
        const params = await getRouterParams(event)
        const body = await readBody(event)
        if (!body) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Invalid form data',
            })
        }
        await TodoList.findByIdAndUpdate(
            params.id,
            { $push: {items: body}},
            { new: true, runValidators: true }
        )
    } catch (e) {
        throw createError({
            statusCode: 500,
            statusMessage: e.message,
        })
    }
})