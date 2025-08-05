import mongoose from "mongoose";
import { Document } from "mongoose";

export interface IComment extends Document {
    comment: string;
    user: string;
    blog: string;
    createdAt?: Date;
}


const CommentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Comment = mongoose.model<IComment>('Comment', CommentSchema)

export default Comment;
