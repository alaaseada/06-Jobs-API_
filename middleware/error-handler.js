const { CustomAPIError }= require("../errors");
const { StatusCodes } = require("http-status-codes");

const errorHandler = (err, req, res, next) => {
    if(err instanceof CustomAPIError){
        return res.status(err.statusCode).json({ msg: err.message})
    }else{
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err})
    }
}

module.exports = errorHandler;