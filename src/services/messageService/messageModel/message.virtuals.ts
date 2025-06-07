import { Schema } from "mongoose";
import IMessage  from "../messageInterface/message.interface"

export default function addMessageVirtuals(schema: Schema) {
    schema.virtual("shortPreview").get(function (this: IMessage) {
        return this.content?.slice(0, 50) + (this.content?.length > 50 ? "..." : "")
    });
}