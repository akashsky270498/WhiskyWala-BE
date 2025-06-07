import { Schema } from "mongoose";

const userSchema = new Schema({

    name: {
        type: String,
        required: [true, "Name is required."],
        trim: true,
        index: true
    },

    email: {
        type: String,
        required: [true, "Email is required."],
        trim: true,
        lowercase: true,
        unique: true
    },

    username: {
        type: String,
        required: [true, "Username is required."],
        trim: true,
        unique: true,
        lowercase: true,
        minlength: [3, "Username must be atleast 3 characters long."]
    },

    password: {
        type: String,
        required: [true, "Password is required."],
        trim: true,
        minlength: [8, "Password must be atleast 8 characters long."],
        select: false
    },

    avatar: {
        type: String,
        trim: true
    },

    bio: {
        type: String,
        default: "Hi, welcome to my profile."
    },

    website: {
        type: String,
        trim: true
    },

    refreshToken: {
        type: String,
        select: false
    },

    resetToken: {
        type: String,
        select: false
    },

    posts: [{
        type: Schema.Types.ObjectId,
        ref: "Post"
    }],

    saved: [{
        type: Schema.Types.ObjectId,
        ref: "Post"
    }],

    followers: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],

    followings: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }]
}, { timestamps: true, versionKey: false });

export default userSchema;