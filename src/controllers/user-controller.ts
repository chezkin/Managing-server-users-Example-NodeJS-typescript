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
    if (!users) { throw new ApiError({}, 500, "Something went wrong .... Please try again") }
    res.status(STATUS_CODES.OK).json(new ApiSuccess<User[]>(users, "Success!"));
  },
);

export const getUserByID = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.params);
    
    const userID = req.params.id
    const user = await service.getUserByID(userID);
    if (!user) { throw new ApiError({}, 500, "Something went wrong .... Please try again") }
    res.status(STATUS_CODES.OK).json(new ApiSuccess<User>(user, "Success!"));
  },
);

export const loginUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const {email , password} = req.body;
    const user = await service.loginUser(email , password);
    if (!user) { throw new ApiError({}, 500, "Something went wrong .... Please try again") }
    res.status(STATUS_CODES.OK).json(new ApiSuccess<{user : User , token : string}>(user, "Success!"));
  },
);

export const createUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const addUser = await service.createUser(req.body);
    if (!addUser) { throw new ApiError({}, 500, "Something went wrong .... Please try again") }
    res.status(STATUS_CODES.CREATED).json(new ApiSuccess<User>(addUser, "Success!"));
  },
);

export const updatedUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userID = req.params.id;
    const updateUser = req.body
    const updated = await service.updateUser(userID ,updateUser);
    if (!updated) { throw new ApiError({}, 500, "Something went wrong .... Please try again") }
    res.status(STATUS_CODES.CREATED).json(new ApiSuccess<User>(updated, `user ${updated.name} update Success!`));
  },
);

export const deleteUserByID = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.params);
    const userID = req.params.id

    
    const user = await service.deleteUser(userID);
    if (!user) { throw new ApiError({}, 500, "Something went wrong .... Please try again") }
    res.status(STATUS_CODES.OK).json(new ApiSuccess<User>(user, `Success! user ${user.name} deleted`));
  },
);




// ? asyncHandler should be used for every request for easy async handling
export const errorUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // Return json with error message and empty data
    throw new ApiError({}, STATUS_CODES.INTERNAL_SERVER_ERROR, "Handled by asyncHandler")
  },
);
