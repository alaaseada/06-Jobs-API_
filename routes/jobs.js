const express = require("express");
const jobsRouter = express.Router();
const jobsController = require("../controllers/jobs");

jobsRouter.route("/").get(jobsController.sayHello);


module.exports = jobsRouter;