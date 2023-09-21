import express from "express";

// Import controllers from
import { 
    errorUser, 
    getUsers, 
    createUser,
    getUserByID,
    deleteUserByID,
    loginUser,
    updatedUser,
    logoutUser,
} from "../controllers/user-controller";
import { verify } from "../middleware/auth-middleware";

// Setup router
const router = express.Router();

// Setup all routes for user
router.get("/", getUsers);

router.get("/logout", logoutUser);

router.get("/:id", getUserByID);

router.delete("/:id", deleteUserByID);

router.post("/register", createUser);

router.put("/update/:id", updatedUser);

router.post("/login", loginUser);

// Setup all routes for user
router.get("/error", errorUser);

// Export router; should always export as default
export default router;
