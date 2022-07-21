const { CustomAPIError }= require("../errors");
const { StatusCodes } = require("http-status-codes");

const errorHandler = (err, req, res, next) => {
    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || "Something went wrong. Please check."
    }
    
    if(err.name === "ValidationError"){
        customError.statusCode = StatusCodes.BAD_REQUEST
        customError.msg = Object.values(err.errors).map((item) => item.message)
    }
    if(err.name === "CastError"){
        customError.statusCode = StatusCodes.NOT_FOUND
        customError.msg = `The id ${err.value} seems incorrect.`
    }
    if(err.code && err.code=== 11000){
        customError.statusCode = StatusCodes.BAD_REQUEST
        customError.msg = `Duplicated ${Object.keys(err.keyValue) }. Please choose another value.`
    }

    return res.status(customError.statusCode).json({ msg: customError.msg})
}

module.exports = errorHandler;