import { Schema } from "mongoose";

export default function addPostIndexes(schema: Schema) {
    schema.index({ postedBy: 1, createdAt: -1 });
    schema.index({ likeCount: -1 });
    schema.index({ commentCount: -1 });
    schema.index({ isDeleted: 1 });
}