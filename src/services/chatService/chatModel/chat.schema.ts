import { Schema } from "mongoose";

const chatSchema = new Schema({

    users: [{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    }],

    latestMessage: {
        type: Schema.Types.ObjectId,
        ref: "Message",
        required: true,
        index: true,
        default: null
    },
}, { timestamps: true, versionKey: false });

export default chatSchema;