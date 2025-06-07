import { Schema } from "mongoose";
import { IChat } from "../chatInterface/chat.interface";

export default function addChatVirtuals(schema: Schema) {
    schema.virtual("userCount").get(function (this: IChat) {
        const users = this.users;
        return users?.length || 0
    })
}