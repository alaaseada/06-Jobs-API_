const Jobs = require("../models/job");
const { BadRequestError, UnauthorizedError } = require("../errors");
const { StatusCodes } = require("http-status-codes");


const getAllJobs = async(req, res) => {
    const userId = req.user.userId;
    const allJobs = await Jobs.find({ userId });
    res.status(StatusCodes.OK).json({ jobs: allJobs });
}


const getJobById = async(req, res) => {
    const { id } = req.params;
    const job = await Jobs.findById(id);
    res.status(200).json({ job });
}


const addJob = async(req, res) => {
    const userId = req.user.userId;
    try {
        const job = await Jobs.create({...req.body, userId});     
        res.status(StatusCodes.CREATED).json({ job })
    } catch (error) {
        throw new BadRequestError("Please provide all fields (company, position, status).");
    }
}


const updateJob = async(req, res) => {
    res.status(200).json({ msg: "Update a job"})
}


const deleteJob = async(req, res) => {
    res.status(200).json({ msg: "Delete a job"})
}


module.exports = {
    getAllJobs,
    getJobById,
    addJob,
    updateJob,
    deleteJob
}