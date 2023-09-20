
import { User, UserModel } from "dataBase/usersSchema";


const getUsers = async () => {
    const users: User[] = await UserModel.find({});
    return users;
}





export default {
    getUsers,
};
