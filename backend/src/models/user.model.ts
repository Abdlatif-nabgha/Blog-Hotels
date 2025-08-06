import mongoose, { Document, Schema } from "mongoose";
import bcrypt from 'bcrypt';

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
    createdAt: Date;
    comparePassword(givenPassword: string): Promise<boolean>;
}

const UserSchema: Schema<IUser> = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// ✅ Hash password before saving
UserSchema.pre<IUser>('save', async function (next) {
    if(!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch(error) {
        console.error('Error hashing password', error);
        next(error);
    }
});

// ✅ Compare password instance method
UserSchema.methods.comparePassword = async function (givenPassword: string): Promise<boolean> {
    return bcrypt.compare(givenPassword, this.password);
};

const User = mongoose.model<IUser>('User', UserSchema);
export default User;
