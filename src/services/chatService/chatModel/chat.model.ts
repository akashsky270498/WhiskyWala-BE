import mongoose from "mongoose";
import chatSchema from "./chat.schema";
import addChatVirtuals from "./chat.virtuals";
import addChatMiddleware from "./chat.middleware";
import addChatIndexes from "./chat.indexes";

addChatVirtuals(chatSchema);
addChatMiddleware(chatSchema);
addChatIndexes(chatSchema);

const ChatModel = mongoose.model("Chat", chatSchema);

export default ChatModel;