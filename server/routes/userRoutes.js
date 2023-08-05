import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import { updateUserController } from "../controllers/userController.js";

// router object
const router = express.Router();

// routes
//** GET USERS || GET */

//** UPDATE USERS || PUT */
router.put("/update-user", userAuth, updateUserController);

// export
export default router;
