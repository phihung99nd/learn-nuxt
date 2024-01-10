import {TodoList} from "~/server/models/todo.schema";

export default defineEventHandler(async event => {
    try {
        const query = getQuery(event)
        await TodoList.findByIdAndDelete(query.id)
    } catch (e: unknown) {
        throw createError({
            statusCode: 500,
            statusMessage: e.message,
        })
    }
})