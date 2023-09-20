import express from "express";

// Import controllers from
import { errorUser, getUsers, createUser} from "@/controllers/user-controller";
import { verify } from "@/middleware/auth-middleware";

// Setup router
const router = express.Router();

// Setup all routes for user
router.get("/", getUsers);

router.post("/new-user", createUser);

// Setup all routes for user
router.get("/error", errorUser);

// Export router; should always export as default
export default router;
