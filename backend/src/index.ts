const express = require('express');
import type { Request, Response } from 'express';
const dotenv = require('dotenv');
dotenv.config();
const { connectDB } = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (_req: Request, res: Response) => {
    res.send('Hello from Express + TypeScript!');
});

app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
});
