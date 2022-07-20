const getAllJobs = async(req, res) => {
    res.status(200).json({ msg: `All jobs for user ${req.user.name}`})
}

const getJobById = async(req, res) => {
    res.status(200).json({ msg: "One job by Id"})
}

const addJob = async(req, res) => {
    res.status(200).json({ msg: "Add a job"})
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