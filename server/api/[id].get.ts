import {TodoList} from "~/server/models/todo.schema";

export default defineEventHandler(async event => {
    try {
        const params = getRouterParams(event)
        return await TodoList.findById(params.id)
    } catch (e) {

    }
})