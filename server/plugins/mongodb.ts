import {Nitro} from 'nitropack'
import mongoose from "mongoose";

export default async (_nitroApp: Nitro) => {
    // Use environment variable
    const env = useRuntimeConfig()
    try {
        await mongoose.connect(env.mongodbUri)
        console.log('Connected to MongoDB')
    } catch (e) {
        console.error(e)
    }
}