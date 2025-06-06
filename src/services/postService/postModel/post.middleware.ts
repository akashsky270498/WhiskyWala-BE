import { Schema } from "mongoose";
import { IPost } from "../postInterface/post.interface";

export default function addPostMiddleware(schema: Schema) {
    schema.pre<IPost>("save", function (next) {
        this.likeCount = this.likedBy?.length || 0;
        this.commentCount = this.comments?.length || 0;
        next();
    })
}