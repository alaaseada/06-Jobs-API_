const express = require("express");
const jobsRouter = express.Router();
const jobsController = require("../controllers/jobs");

jobsRouter.route("/add").post(jobsController.createJob);
jobsRouter.route("/").get(jobsController.getAllJobs);
jobsRouter.route("/:id").get(jobsController.getJob).patch(jobsController.updateJob).delete(jobsController.deleteJob);


module.exports = jobsRouter;