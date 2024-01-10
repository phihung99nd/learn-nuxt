import {TodoList} from "~/server/models/todo.schema";

export default defineEventHandler(async event => {
    try {
        const body = await readBody(event)
        const params = await getRouterParams(event)
        if(!body) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Invalid form data',
            })
        }
        await TodoList.findOneAndUpdate(
            {_id: params.id, 'items._id': params.itemId},
            { $set: { 'items.$.name': body.name, 'items.$.checked': body.checked} },
            {new: true}
        )
    } catch (e) {

    }
})