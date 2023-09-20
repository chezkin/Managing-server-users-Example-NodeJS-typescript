import { NextFunction } from "connect";
import { Request, Response } from "express";

// @desc Authenticates user and protects routes

export const verify = (req: Request, res: Response, next: NextFunction): {}=>  {
  const a = 1
  if (a === 1) {
    console.log('1');
    return res.status(401).json({ message: "Unauthorized" });
  } 
  next();

  return {}

};
