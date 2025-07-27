// create blog-hotel controller
import { Request, Response } from 'express';
import Blog, {IBlog} from '../models/blog.model';

// Get all hotels
export const getAllBlogs = async (_req: Request, res: Response) => {
    try {
        // if you want to use a specific query, you can add it here
        const { search, category, location } = _req.query;
        let query = {}; // if search query is provided, add it to the query
        if (search) {
            query = {
                ...query,
                $or: [
                    { title: { $regex: search, $options: 'i' } },
                    { content: { $regex: search, $options: 'i' } },
                ]
            }
        }

        if (category) {
            query = { ...query, category };
        }
        if (location) {
            query = { ...query, location };
        }

        const blogs: IBlog[] = await Blog.find(query).sort({ createdAt: -1 });
        res.status(200).json(blogs);
    } catch (error) {
        console.error('Error fetching hotels:', error);
        res.status(500).json({ message: 'Error fetching hotels', error });
    }
}

// Get a single hotel by ID
export const getBlogById = async (req: Request, res: Response) => {
    try {
        const blogId = req.params.id;
        const blog: IBlog | null = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.status(200).json(blog);
    } catch (error) {
        console.error('Error fetching blog:', error);
        res.status(500).json({ message: 'Error fetching blog', error });
    }
}

// Create a new hotel
export const createBlog = async (req: Request, res: Response) => {
    try {
    // ✅ Type-safe creation with spread
    const blog: IBlog = await Blog.create({ ...req.body });
    // ✅ Type-safe response
    res.status(201).json({
        success: true,
        message: 'Blog created successfully',
        data: blog.toObject() // Convert Mongoose document to plain object
    });
    } catch (error: unknown) { // TypeScript 4.0+ "unknown" type for errors
    console.error(error);
    // ✅ Type-safe error response
    res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : "Internal Server Error"
    });
    }
}

// Update a hotel by ID
export const updateBlog = async (req: Request, res: Response) => {
    try {
        const blogId = req.params.id;
        const updatedBlog: IBlog | null = await Blog.findByIdAndUpdate(blogId, {
            ...req.body
        }, { new: true });
        if (!updatedBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.status(200).json({
            success: true,
            message: 'Blog updated successfully',
            data: updatedBlog.toObject() // Convert Mongoose document to plain object
        });
    } catch (error) {
        console.error('Error updating blog:', error);
        res.status(500).json({ message: 'Error updating blog', error });
    }
}

// Delete a hotel by ID
export const deleteBlog = async (req: Request, res: Response) => {
    try {
        const blogId = req.params.id;
        const deletedBlog: IBlog | null = await Blog.findByIdAndDelete(blogId);
        if (!deletedBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.status(200).json({
            success: true,
            message: 'Blog deleted successfully',
        });
    } catch (error) {
        console.error('Error deleting blog:', error);
        res.status(500).json({ message: 'Error deleting blog', error });
    }
}

// related blogs
export const relatedBlogs = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        if (!id) {
            return res.status(400).json({ message: 'Blog ID is required' });
        }
        const blog: IBlog | null = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        const titleRegex = new RegExp(blog.title.split(' ').join('|'), 'i');
        const relatedQuery = {
            _id: { $ne: id },
            title: { $regex: titleRegex},
        }
        const relatedBlogs: IBlog[] = await Blog.find(relatedQuery);
        res.status(200).json(relatedBlogs);
    } catch (error) {
        console.error('Error fetching related blogs:', error);
        res.status(500).json({ message: 'Error fetching related blogs', error });
    }
}