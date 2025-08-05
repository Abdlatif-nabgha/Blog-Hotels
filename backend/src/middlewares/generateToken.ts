import User, { IUser } from "../models/user.model";
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'abdelatifnabgha06';

export const generateToken = async (userId:string) => {
    try {
        const user:IUser = await User.findById(userId);
        if (!user) throw new Error("User not found");
        const token = jwt.sign({
            userId: user._id,
            role: user.role
        }, 
        JWT_SECRET, 
        {expiresIn: '1h'}
    );
        return token;
    } catch(error) {
        console.error("Error generation token", error);
        throw error;
    }
}
