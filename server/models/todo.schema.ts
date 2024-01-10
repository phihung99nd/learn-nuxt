import { Schema, model } from 'mongoose'

const TodoItemSchema = new Schema({
    name: {type: String, required: true},
    checked: Boolean
},{ timestamps: true })

export const TodoItem = model<any>('TodoItem', TodoItemSchema)

const TodoListSchema = new Schema({
    name: {type: String, required: true},
    description: String,
    color: {type: String, required: true},
    items: [TodoItemSchema]
},{ timestamps: true })

export const TodoList = model<any>('TodoList', TodoListSchema)