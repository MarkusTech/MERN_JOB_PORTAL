import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import {
  createJobController,
  getAllJobsController,
  updateJobController,
} from "../controllers/jobsControllers.js";

// router object
const router = express.Router();

// routes
//** CREATE JOB || POST */
router.post("/create-job", userAuth, createJobController);

//** GET JOBS || GET */
router.get("/get-job", userAuth, getAllJobsController);

//** UPDATE JOBS || PUT || PATCH */
router.patch("/update-job/:id", userAuth, updateJobController);

// export
export default router;
