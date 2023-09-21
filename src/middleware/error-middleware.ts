import STATUS_CODES from "../utils/StatusCodes";
import { ApiError } from "../types/interfaces/interfaces.common";
import { Request, Response, NextFunction } from "express";
import { ApiError as ApiErrorr} from "../utils/ApiError";
import { asyncHandler } from "./async-middleware";

// @desc Handles error responses from throw errors

export const errorResponse = (error: ApiError, _req: Request, res: Response, _next: NextFunction) => {
   res.status(error.statusCode).json({
      success: false,
      data: error.data,
      message: error.message,
   });
};

