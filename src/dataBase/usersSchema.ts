import mongoose, { Schema, Document, Model } from 'mongoose';

export interface User extends Document {
    name: string;
    email: string;
    password: string;
}


const userSchema = new mongoose.Schema<User>(
    {
      name: {
        type: String,
        required: true,
      },
      email: {
          type: String,
          required: true,
          minlength: 5,
          validate: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
      },
      password: {
          type: String,
          required: true,
          min: 7,
          max: 20
      },
    },
    {
      timestamps: true,
    }
  );

export const UserModel: Model<User> = mongoose.model<User>('user', userSchema);