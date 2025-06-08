import { Schema } from "mongoose";

export default function addChatIndexes(schema: Schema): void {
    schema.index({ users: 1 });
    schema.index({ latestMessage: 1 });
    schema.index({ users: 1 }, { unique: true });
}