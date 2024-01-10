import {TodoItem, TodoList} from "~/server/models/todo.schema";

export default defineEventHandler(async event => {
    try {
        const body = await readBody(event)
        if (!body) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Invalid form data',
            })
        }
        const doc = new TodoList(body)
        doc.save()
        return doc._id.toHexString()
    } catch (e) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong',
        })
    }
})