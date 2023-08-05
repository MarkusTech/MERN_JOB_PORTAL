import jobsModel from "../models/jobsModel.js";
import mongoose from "mongoose";

//** Create job */
const createJobController = async (req, res, next) => {
  const { company, position } = req.body;
  if (!company || !position) {
    next("Please Provide All Fields");
  }
  req.body.createdBy = req.user.userId;
  const job = await jobsModel.create(req.body);
  res.status(201).json({ job });
};

//** Get all Created jobs */
const getAllJobsController = async (req, res, next) => {
  const result = await jobsModel.find({ createdBy: req.user.userId });
  res.status(200).json({
    totalJobs: result.length,
    result,
  });
};

//** Update Jobs */
const updateJobController = async (req, res, next) => {
  const { id } = req.params;
  const { company, position } = req.body;
  // validation
  if (!company || !position) {
    next("Please Provide All Fields");
  }
  // find job
  const job = await jobsModel.findOne({ _id: id });
  // validation
  if (!job) {
    next(`No jobs found with this id ${id}`);
  }
  if (!req.user.userId === job.createdBy.toString()) {
    next("Your Not Authorized to update this job");
  }
  const updatejob = await jobsModel.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  // res
  res.status(200).json({ updatejob });
};

export { createJobController, getAllJobsController, updateJobController };
