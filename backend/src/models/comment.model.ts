import mongoose, { Document } from "mongoose";

export interface IComment extends Document {
    comment: string;
    user: mongoose.Types.ObjectId;
    postId: mongoose.Types.ObjectId;
    createdAt?: Date;
}

const CommentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Comment = mongoose.model<IComment>("Comment", CommentSchema);

export default Comment;
