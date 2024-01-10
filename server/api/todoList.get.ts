import {TodoItem, TodoList} from "~/server/models/todo.schema";

export default defineEventHandler(async event => {
    try {
        const items = await TodoList.find().sort('createdAt')
        return items
    } catch (e: unknown) {
        throw createError({
            statusCode: 500,
            statusMessage: e.message,
        })
    }
})