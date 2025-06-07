import { Schema } from "mongoose";

export default function addChatIndexes(schema: Schema) {
    schema.index({ users: 1 });
    schema.index({ latestMessage: 1 })
}