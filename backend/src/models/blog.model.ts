import mongoose from "mongoose";
import { Document } from "mongoose";

export interface IBlog extends Document {
    title: string;
    description?: string;
    content: Object;
    coverImg: string; // add coverImg field
    category: string;
    author: mongoose.Schema.Types.ObjectId;
    rating: number;
    createdAt: Date; // add createdAt field
}


const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    content: {
        type: Object,
        required: true
    },
    coverImg: String,
    category: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    rating: Number,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Blog = mongoose.model<IBlog>('Blog', BlogSchema);

export default Blog;
