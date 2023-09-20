
import { ApiError } from "@/utils/ApiError";
import { User, UserModel } from "dataBase/usersSchema";
import { Document, Types } from "mongoose";
import bcrypt from "bcrypt";
import STATUS_CODES from "@/utils/StatusCodes";
import Joi from 'joi';



// פונקציה לקבלת רשימת משתמשים
const getUsers = async () => {
    const users: User[] = await UserModel.find({});
    if (users.length === 0) {
        throw new ApiError({}, STATUS_CODES.NOT_FOUND , "users not found");
    }
    return users;
}

// פונקציה לקבלת משתמש לפי ID
const getUserByID = async (id : string) => {    
    const user: User | null = await UserModel.findById(id);
    if (!user) {
        throw new ApiError({}, STATUS_CODES.NOT_FOUND , "user not found");
    }
    return user;
}

// פונקציה ליצירת משתמש חדש
const createUser = async (user : User) => {  
    const { name, email, password } = user;
    
    // בדיקת חוקיות אימייל וסיסמה
    const { error: emailError } = validateEmail(email);
    const { error: passwordError } = validatePassword(password);

    if (emailError || passwordError) {
        throw new ApiError({}, STATUS_CODES.BAD_REQUEST , "Invalid email or password");
    }

    // בדיקה אם המייל כבר קיים
    const ifuserEmailExist = await UserModel.findOne({ email });
    if (ifuserEmailExist) {
        throw new ApiError({}, STATUS_CODES.BAD_REQUEST , `User "${ifuserEmailExist.email}" already exists`);
    }

    // הצפנת הסיסמה
    const hashedPassword = await hashPassword(password);

    // יצירת משתמש חדש
    const newUser = await UserModel.create({
        name,
        email,
        password: hashedPassword
    });

    if (newUser) {
  
        return newUser;
    } else {
        throw new ApiError( {}, STATUS_CODES.INTERNAL_SERVER_ERROR, 'Invalid user data');
    }
}

// פונקציה לעדכון משתמש
const updateUser = async (id : string, updatedUser : User) => {
    const { name, email, password } = updatedUser;

    // בדיקת חוקיות אימייל וסיסמה
    const { error: emailError } = validateEmail(email);
    const { error: passwordError } = validatePassword(password);

    if (emailError || passwordError) {
        throw new ApiError({}, STATUS_CODES.BAD_REQUEST , "Invalid email or password");
    }
    const hashedPassword = await hashPassword(password);
    updatedUser.password = hashedPassword
    const user = await UserModel.findByIdAndUpdate(id, updatedUser, { new: true });
    if (!user) {
        throw new ApiError({}, STATUS_CODES.NOT_FOUND , "User not found");
    }

    return user;
}

// פונקציה למחיקת משתמש
const deleteUser = async (id : string) => {
    const user = await UserModel.findByIdAndDelete(id);
    if (!user) {
        throw new ApiError({}, STATUS_CODES.NOT_FOUND , "User to you want delete not found");
    }
    return user;
}

// פונקציה להתחברות משתמש
const loginUser = async (email : string, password : string) => {
    const user = await UserModel.findOne({ email });  
    if (!user) {
        throw new ApiError({}, STATUS_CODES.NOT_FOUND , "User not found");
    }

    // בדיקה שהסיסמה מתאימה
    const passwordMatch = await comparePassword(password, user.password);
    if (!passwordMatch) {
        throw new ApiError({}, STATUS_CODES.UNAUTHORIZED , "Incorrect password");
    }

    // יצירת טוקן
    const token = generateToken(user);
    return { user, token };
}



// הוספת פונקציה ליצירת טוקן
const generateToken = (user : User) => {
    // כאן תיצור טוקן לפי הביטויים שלך
    // זה יכול להיות באמצעות JWT או כל פורמט אחר שבחרת
    return `${user.name}`;
}

export default {
    getUsers,
    getUserByID,
    createUser,
    updateUser,
    deleteUser,
    loginUser
};



// הוספת פונקציה לצפנת סיסמה
const hashPassword = async (password : string) => {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
}

// הוספת פונקציה להשוואת סיסמה
const comparePassword = async (password : string, hashedPassword : string) => {
    return bcrypt.compare(password, hashedPassword);
}


// סכמות Joi
const emailSchema = Joi.string().email().required();
const passwordSchema = Joi.string().min(6).max(15).required();

const validateEmail = (email : string) => emailSchema.validate(email);
const validatePassword = (password : string) => passwordSchema.validate(password);

