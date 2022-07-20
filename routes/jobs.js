const express = require("express");
const jobsRouter = express.Router();
const jobsController = require("../controllers/jobs");
const authenticationMiddleware = require("../middleware/auth");

jobsRouter.route("/add").post(jobsController.addJob);
jobsRouter.route("/").get(authenticationMiddleware, jobsController.getAllJobs);
jobsRouter.route("/:id").get(jobsController.getJobById).patch(jobsController.updateJob).delete(jobsController.deleteJob);


module.exports = jobsRouter;