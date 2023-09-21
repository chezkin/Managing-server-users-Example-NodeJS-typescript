import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction } from "connect";
import { Request, Response } from "express";
import STATUS_CODES from '../utils/StatusCodes';
import { asyncHandler } from "../middleware/async-middleware";
import { ApiError } from "../utils/ApiError";


// @desc Authenticates user and protects routes

export const verify = asyncHandler( async (req : Request, res : Response, next : NextFunction) => {

  
  const token = req.cookies.jwt;
  const currrentUserId = req.body.userId;
  let decoded;

  if (!token) {
    throw new ApiError({} , STATUS_CODES.UNAUTHORIZED ,'Not authorized, no token');
  }

  if(!process.env.JWT_SECRET){
    console.error('JWT_SECRET not defined');
    process.exit(1);
  }

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new ApiError({} , 401 ,'Not authorized, token failed');
  }

  // if the id in the token does not match the id in the request body
  // if(currrentUserId !== (decoded as JwtPayload).userId){
  //   res.status(STATUS_CODES.UNAUTHORIZED);
  //   throw new ApiError({} , STATUS_CODES.UNAUTHORIZED ,'Not authorized, token id and user id do not match');
  // }
       
  next(); 

  
});