import { Schema } from "mongoose";
import {IPost } from "../postInterface/post.interface"

export default function addPostVirtuals(schema: Schema) {
    schema.virtual("isLiked").get(function (this: IPost) {
        return this._userId ? this.likedBy?.includes(this._userId) : false;
    });

    schema.virtual("isSaved").get(function (this: IPost) {
        return this._userId ? this.savedBy?.includes(this._userId) : false;
    })
}