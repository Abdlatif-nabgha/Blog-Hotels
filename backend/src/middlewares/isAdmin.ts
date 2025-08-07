import { NextFunction, Request, Response } from "express";

interface AuthRequest extends Request {
    role: string;
}
export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.role !== 'admin') {
        return res.status(401).json({
            success: false,
            message: "You're not allowed to perform this action, please login as admin"
        });
    }
    next();
}