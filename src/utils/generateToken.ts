import { Response } from 'express';
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

const generateToken = (res: Response, userId: Types.ObjectId) => {
    if(!process.env.JWT_SECRET) {
        console.error('JWT_SECRET not defined');
        process.exit(1);
    }

    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '1h',
    });

    res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
    sameSite: 'strict', // Prevent CSRF attacks
    maxAge: 1000 * 60 * 60, // 1 hour
    });
};

export default generateToken;