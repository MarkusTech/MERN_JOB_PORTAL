import jobsModel from "../models/jobsModel.js";
import mongoose from "mongoose";
import moment from "moment";

//** CREATE JOBS */
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
  const { status } = req.query;
  // condition for searching filters
  const queryObject = {
    createdBy: req.user.userId,
  };
  // logic filters
  if (status && status !== "all") {
    queryObject.status = status;
  }
  const queryResult = jobsModel.find(queryObject);
  const jobs = await queryResult;

  // const result = await jobsModel.find({ createdBy: req.user.userId });
  res.status(200).json({
    totalJobs: result.length,
    result,
  });
};

//** UPDATE JOBS */
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
    return;
  }
  const updatejob = await jobsModel.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  // res
  res.status(200).json({ updatejob });
};

//** DELETE JOBS */
const deleteJobController = async (req, res, next) => {
  const { id } = req.params;
  // find job
  const job = await jobsModel.findOne({ _id: id });
  // validation
  if (!job) {
    next(`No Job Found With This ID ${id}`);
  }
  if (!req.user.userId === job.createdBy.toString()) {
    next("Your Not Authorize to delele this job");
    return;
  }
  await job.deleteOne();
  res.status(200).json({ message: "Success, Job Deleted!" });
};

//** JOBS STATS & FILTER */
const jobsStatsController = async (req, res, next) => {
  const stats = await jobsModel.aggregate([
    // search by user jobs
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  // default stats
  const defaultStats = {
    pending: stats.pending || 0,
    reject: stats.reject || 0,
    interview: stats.interview || 0,
  };

  // monthly yearly stats
  let monthlyApplication = await jobsModel.aggregate([
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        count: {
          $sum: 1,
        },
      },
    },
  ]);
  monthlyApplication = monthlyApplication
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM Y");
      return { date, count };
    })
    .reverse();
  res.status(200).json({
    totalJobs: stats.length,
    defaultStats,
    monthlyApplication,
  });
};

export {
  createJobController,
  getAllJobsController,
  updateJobController,
  deleteJobController,
  jobsStatsController,
};
