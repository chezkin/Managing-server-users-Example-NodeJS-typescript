import { Request, Response, NextFunction } from "express";
import { ApiSuccess } from "@/utils/ApiSucess";
import { asyncHandler } from "@/middleware/async-middleware";
import { User } from "dataBase/usersSchema";
import { ApiError } from "@/utils/ApiError";
import service from "../service/user-service";
import { errorResponse } from "@/middleware/error-middleware";
import STATUS_CODES from "@/utils/StatusCodes";



export const getUsers = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await service.getUsers();
    if (!users) { throw new ApiError({}, 500, "Handled by asyncHandler") }
    res.status(STATUS_CODES.OK).json(new ApiSuccess<User[]>(users, "Success!"));
  },
);

export const createUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const addUser = await service.createUser(req.body);
    if (!addUser) { throw new ApiError({}, 500, "Handled by asyncHandler") }
    res.status(STATUS_CODES.CREATED).json(new ApiSuccess<User>(addUser, "Success!"));
  },
);





// ? asyncHandler should be used for every request for easy async handling
export const errorUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // Return json with error message and empty data
    throw new ApiError({}, STATUS_CODES.INTERNAL_SERVER_ERROR, "Handled by asyncHandler")
  },
);
