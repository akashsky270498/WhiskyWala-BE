import { Document, Types } from "mongoose";

export default interface IMessage extends Document {
    sender: Types.ObjectId;
    chatId: Types.ObjectId;
    content: string;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date

    shortPreview?: string //virtual field
}