import express from "express";
const router = express.Router();
import { getAllComments, createComment } from "../controllers/comment.controller";

// get all comments
router.get('/total-comments', getAllComments);

// create comment
router.post('/post-comment', createComment);


export default router;  