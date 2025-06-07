import { Schema } from "mongoose";

export default function addMessageIndex(schema: Schema) {
    schema.index({ sender: 1, createdAt: -1 });
    schema.index({ chatId: 1, createdAt: -1 });
}