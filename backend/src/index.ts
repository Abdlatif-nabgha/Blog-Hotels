import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db';
import hotelRouter from './routers/hotel.routes';

const app = express();
const PORT = process.env.PORT;

// parse json
app.use(express.json());
// cors
app.use(cors());

// routes
app.use('/api/hotels', hotelRouter);

app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
});
