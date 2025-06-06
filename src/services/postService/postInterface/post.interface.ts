import { Document, Types } from "mongoose";

export interface IComment {
    user: Types.ObjectId;
    comment: string;
    createdAt: Date;
}

export interface IPost extends Document {
    caption?: string;
    image?: string;
    postedBy: Types.ObjectId;
    likedBy: Types.ObjectId[];
    comments: IComment[];
    savedBy: Types.ObjectId[];
    likeCount: number;
    commentCount: number;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
    isLiked?: boolean;
    isSaved?: boolean;
    _userId?: Types.ObjectId;
}