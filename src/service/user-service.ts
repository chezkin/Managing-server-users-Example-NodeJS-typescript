
import { ApiError } from "@/utils/ApiError";
import { User, UserModel } from "dataBase/usersSchema";
import { Document, Types } from "mongoose";
import bcrypt from "bcrypt";
import STATUS_CODES from "@/utils/StatusCodes";


const getUsers = async () => {
    const users: User[] = await UserModel.find({});
    return users;
}

const createUser = async (user : User) => {
    const {name, email, password} = user;
    const ifuser = await UserModel.findOne({email,});
    if (ifuser) {
        throw new ApiError({}, STATUS_CODES.BAD_REQUEST ,`User ${ifuser.email} already exists`);
    };
    const hashedPassword = await hashPassword(password);

    const newUser = await UserModel.create({
        name,
        email,
        password: hashedPassword
    });

    if (newUser) {
        //generateToken(res, user._id);

        return newUser;
    } else {
        throw new ApiError( {}, STATUS_CODES.INTERNAL_SERVER_ERROR, 'Invalid user data');
    }
}







export default {
    getUsers,
    createUser,
};

async function hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

async function comparePassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
}

