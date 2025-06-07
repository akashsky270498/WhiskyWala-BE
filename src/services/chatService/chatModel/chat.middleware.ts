import { Schema } from "mongoose";
import { IChat } from "../chatInterface/chat.interface";

export default function addChatMiddleware(schema: Schema) {
    schema.pre("save", function (this: IChat, next) {
        if (!this.users || this.users?.length < 2) {
            return next(new Error("A chat must have atleast two users."));
        }
        next();
    })
}