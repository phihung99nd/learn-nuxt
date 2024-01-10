import {TodoList} from "~/server/models/todo.schema";

export default defineEventHandler(async event => {
    try {
        const params = await getRouterParams(event)
        await TodoList.findOneAndUpdate(
            {_id: params.id},
            { $pull: { items: { _id: params.itemId} } },
            {new: true}
        )
    } catch (e) {

    }
})