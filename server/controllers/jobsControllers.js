import jobsModel from "../models/jobsModel.js";

const createJobController = async (req, res, next) => {
  res.send("WennWorks");
  next("error");
};

export { createJobController };
