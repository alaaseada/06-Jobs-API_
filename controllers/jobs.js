const Jobs = require("../models/job");
const { BadRequestError, NotFoundError } = require("../errors");
const { StatusCodes } = require("http-status-codes");


const getAllJobs = async(req, res) => {
    const { userId } = req.user;
    const jobs = await Jobs.find({ createdBy: userId }).sort('-createdAt');
    res.status(StatusCodes.OK).json({ count:jobs.length, jobs });
}


const getJob = async(req, res) => {
    const { user: { userId }, params: { id: jobId } } = req
    const job = await Jobs.findOne( {_id: jobId, createdBy: userId });
    if(!job){ throw new NotFoundError("The job is not found.")}
    res.status(200).json({ job });
}


const createJob = async(req, res) => {
    req.body.createdBy = req.user.userId;
    const job = await Jobs.create(req.body);     
    res.status(StatusCodes.CREATED).json({ job })
}


const updateJob = async(req, res) => {
    const { user: { userId }, params: { id: jobId }, body: { company, position }} = req
    if(company === "" || position === "") { throw new BadRequestError("Comppany and Position have to be provided.")}
    const job = await Jobs.findOneAndUpdate({ _id:jobId, createdBy: userId }, req.body, { new: true, runValidators: true});
    if(!job){ throw new NotFoundError ("No jobs are found.")}
    res.status(StatusCodes.OK).json({ job })
}


const deleteJob = async(req, res) => {
    const { user: { userId }, params: { id: jobId }}= req
    const job = await Jobs.findOneAndDelete({ _id:jobId, createdBy: userId });
    if(!job){ throw new NotFoundError ("No job is found.")}
    res.status(StatusCodes.OK).json({ msg: "The job has been successfully deleted." })
}


module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}