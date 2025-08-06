import { Request, Response } from 'express';
import User, { IUser } from '../models/user.model';
import { generateToken } from '../middlewares/generateToken';

// register a new user
export const register = async (req: Request, res: Response) => {
    try {
        const {username, email, password} = req.body;
        const user: IUser = new User({username, email, password});
        await user.save();
        return res.status(200).json({
            message: "user has registered successufully",
            user: user
        });
    } catch(error) {
        console.error("Error registering a new user", error);
        return res.status(400).json({message: "Error registering new user", error});
    }
}

// login a user
export const login = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body;
        const user:IUser = await User.findOne({email});
        if(!user) {
            return res.status(404).json({message: "User not found", error: "User not found"});
        }
        const isMatch:boolean = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({message: "Invalid password", error: "Invalid password"});
        }

        // generate token here
        const token = await generateToken(user.id);
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: true
        })
        res.status(200).json({
            message: "Login successfully",
            token,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        })
    } catch(error) {
        console.error("Error login user", error);
        return res.status(400).json({message: "Error accurd while login into your account", error});
    }
}


// logout a user
export const logout = async (req: Request, res: Response) => {
    try {
        res.clearCookie('token');
        res.status(200).json({message: "Logout successfully"});
    } catch(error) {
        console.error("Error logging out user", error);
        res.status(400).json({message: "Logout failed", error});
    }
};

// get all users
export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find({}, 'id email role');
        res.status(200).json({message: "All users", users});
    } catch (error) {
        console.error('error fetching users', error);
        return res.status(400).json({message: "Error fetching users", error});
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({message: "User not found", error: "User not found"});
        }
        res.status(200).json({message: "User deleted successfully"});
    } catch (error) {
        console.error('error deleting user', error);
        return res.status(400).json({message: "Error deleting user", error});
    }
}

// update user role
export const updatedUserRole = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { role } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, {role}, {new: true});
        if (!updatedUser) {
            return res.status(404).json({message: "User not found", error: "User not found"});
        }
        res.status(200).json({message: "User role updated successfully", user: updatedUser});
    } catch(error) {
        console.error('error updating user', error);
        res.status(400).json({message: "Failed to update user role", error});
    }
}