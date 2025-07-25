import mongoose from "mongoose";


const HotelSchema = new mongoose.Schema({
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

const Hotel = mongoose.model('Hotel', HotelSchema);

export default Hotel;
