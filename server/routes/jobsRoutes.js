import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import { createJobController } from "../controllers/jobsControllers.js";

// router object
const router = express.Router();

// routes
//** Create Job || POST */
router.post("/create-job", userAuth, createJobController);

// export
export default router;
