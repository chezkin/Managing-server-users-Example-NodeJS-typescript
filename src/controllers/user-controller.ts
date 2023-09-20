import { Request, Response, NextFunction } from "express";
import { ApiSuccess } from "@/utils/ApiSucess";
import { asyncHandler } from "@/middleware/async-middleware";
import { User } from "dataBase/usersSchema";
import { ApiError } from "@/utils/ApiError";
import service from "../service/user-service";
import { errorResponse } from "@/middleware/error-middleware";



export const getUsers = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await service.getUsers();
    if (!users) { throw new ApiError({}, 500, "Handled by asyncHandler") }
    res.status(200).json(new ApiSuccess<User[]>(users, "Success!"));
  },
);


// ? asyncHandler should be used for every request for easy async handling
export const errorUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // Return json with error message and empty data
    throw new ApiError({}, 500, "Handled by asyncHandler")
  },
);
