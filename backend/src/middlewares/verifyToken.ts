import jwt from 'jsonwebtoken';
import { Response, Request, NextFunction } from 'express';

const JWT_SECRET = process.env.JWT_SECRET_KEY || 'abdelatifnabgha06';

// 1️⃣ Create an interface that extends Express Request
interface AuthRequest extends Request {
    userId: string;
    role: string;
}

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        //const token = req.cookies.token;
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({message: "No token provided"});
        }
        // 2️⃣ Verify the token
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; role: string };

        if (!decoded.userId) {
            return res.status(401).json({message: "Invalid token"});
        }
        // 3️⃣ Attach the user ID and role to the request object
        req.userId = decoded.userId;
        req.role = decoded.role;
        next();
    } catch(error) {
        console.error("Error verify token", error);
        res.status(401).json({message: "Invalid token"});
    }
}