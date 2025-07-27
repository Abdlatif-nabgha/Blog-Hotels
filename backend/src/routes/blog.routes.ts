import express from "express";
import { getAllBlogs, createBlog, getBlogById, updateBlog, deleteBlog } from '../controllers/blog.controller';

const router = express.Router();

// get all blogs-hotels
router.get('/', getAllBlogs); 

// get a single blog-hotel by ID
router.get('/:id', getBlogById);

// create a new blog-hotel
router.post('/create-post', createBlog);

// put request
router.put('/update-post/:id', updateBlog);

// delete request
router.delete('/delete-post/:id', deleteBlog);

export default router;