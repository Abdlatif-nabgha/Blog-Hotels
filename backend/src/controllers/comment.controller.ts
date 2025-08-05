import { Request, Response } from 'express';
import Comment, { IComment } from '../models/comment.model';


// get all comments
export const getAllComments = async (_req: Request, res: Response) => {
    try {
        const totalComments = await Comment.countDocuments({});
        res.status(200).json({message: "Total comments", totalComments });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error getting comments', error: err });
    }
}

// create comment
export const createComment = async (req: Request, res: Response) => {
    try {
        const { comment, user, postId} = req.body;

        // validation: check required fields
        if (!comment || !user || !postId) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const newComment: IComment = new Comment({ comment, user, postId });
        await newComment.save();
        res.status(201).json({
            message: "Comment created successfully",
            comment: newComment
        });
    } catch (error) {
        console.error("Error creating comment: ", error);
        res.status(500).json({ message: "Error creating comment", error });
    }
}

