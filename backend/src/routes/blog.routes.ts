import express from "express";
import { getAllBlogs, createBlog, getBlogById, updateBlog, deleteBlog, relatedBlogs } from '../controllers/blog.controller';
import { verifyToken } from "../middlewares/verifyToken";
import { isAdmin } from "../middlewares/isAdmin";

const router = express.Router();

// get all blogs-hotels
router.get('/', getAllBlogs); 

// get a single blog-hotel by ID
router.get('/:id', getBlogById);

// related blogs
router.get('/related-blogs/:id', relatedBlogs);

// create a new blog-hotel
router.post('/create-blog',verifyToken,isAdmin, createBlog);

// put request
router.put('/update-blog/:id', verifyToken, updateBlog);

// delete request
router.delete('/delete-blog/:id', verifyToken, deleteBlog);

export default router;