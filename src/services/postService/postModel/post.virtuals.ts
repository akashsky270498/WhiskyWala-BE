import { Schema } from "mongoose";
import {IPost } from "../postInterface/post.interface"

export default function addPostVirtuals(schema: Schema) {
    schema.virtual("isLiked").get(function (this: IPost) {
        return this._userId ? this.likedBy?.includes(this._userId) : false;
    });

    schema.virtual("isSaved").get(function (this: IPost) {
        return this._userId ? this.savedBy?.includes(this._userId) : false;
    });

    schema.virtual("likeCountVirtual").get (function (this: IPost) {
        return this.likedBy?.length || 0;
    });

    schema.virtual("saveCountVirtual").get(function (this: IPost) {
        return this.savedBy?.length || 0;
    });

    schema.virtual("commentCountVirtual").get(function (this: IPost) {
        return this.comments?.length || 0;
    });
}