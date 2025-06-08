import { Schema, UpdateQuery } from "mongoose";
import { IPost } from "../postInterface/post.interface";

export default function addPostMiddleware(schema: Schema) {
    schema.pre<IPost>("save", function (next) {
        this.likeCount = this.likedBy?.length || 0;
        this.commentCount = this.comments?.length || 0;
        next();
    });

    const updateHooks = ["updateOne", "findOneAndUpdate"] as const;

    updateHooks.forEach((hook) => {
        schema.pre(hook, function (next) {
            const update = this.getUpdate() as UpdateQuery<IPost>;

            if (!update) return next();

            const set = update.$set || {};

            if ("likedBy" in set && Array.isArray(set.likedBy)) {
                set.likeCount = set.likedBy.length;
            }

            if ("comments" in set && Array.isArray(set.comments)) {
                set.commentCount = set.comments.length;
            }

            if (Object.keys(set).length > 0) {
                update.$set = set;
            }

            next();
        });
    });
}
