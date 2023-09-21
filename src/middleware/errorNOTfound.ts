import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "./async-middleware";
import STATUS_CODES from "../utils/StatusCodes";
import { ApiError } from "../utils/ApiError";


export const notFound = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    console.log('not found');
    const error = new ApiError({},STATUS_CODES.NOT_FOUND,`Not Found - ${req.originalUrl}`);
    next(error);
  },
  );

  export const catchErrors = (err : Error | ApiError, req : Request, res : Response) => {
    // התנאים הבאים יתאימו לסוגי השגיאות שאתה רוצה לתפוס
    if (err instanceof ApiError) {
      res.status(err.statusCode).json({
        success: false,
        data: err.data,
        message: err.message,
      });
    } else {
      // טפל בשגיאות אחרות כאן
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
      });
    }
  };