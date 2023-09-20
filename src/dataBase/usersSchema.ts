import mongoose, { Schema, Document, Model } from 'mongoose';

export interface User extends Document {
    username: string;
    email: string;
    password: string;
}

const UserSchema: Schema<User> = new Schema<User>({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
}, { timestamps: true });

export const UserModel: Model<User> = mongoose.model<User>('user', UserSchema);