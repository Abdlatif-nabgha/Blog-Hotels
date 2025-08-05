import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db';
import blogRouter from './routes/blog.routes';
import commentRouter from './routes/comment.route';
import userRouter from './routes/auth.user.route';
const app = express();
const PORT = process.env.PORT;

// parse json
app.use(express.json());
// cors
app.use(cors());

// routes user authentification
app.use('/api/auth', userRouter);
// routes blogs
app.use('/api/blogs', blogRouter);
// routes comments
app.use('/api/comments', commentRouter);


app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
});
