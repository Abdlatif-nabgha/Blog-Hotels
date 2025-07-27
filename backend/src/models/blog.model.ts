import mongoose from "mongoose";
import { Document } from "mongoose";

export interface IBlog extends Document {
    title: string;
    description?: string;
    content?: string;
    coverImg?: string; // add coverImg field
    category?: string;
    author?: string;
    rating?: number;
    createdAt?: Date; // add createdAt field
}


const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    content: String,
    coverImg: String,
    category: String,
    author: String,
    rating: Number,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Blog = mongoose.model<IBlog>('Blog', BlogSchema);

export default Blog;
