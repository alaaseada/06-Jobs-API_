const { StatusCodes } = require("http-status-codes");

const notFoundHandler = (req, res) => {
    res.status(StatusCodes.NOT_FOUND).json({ msg: "Sorry! the page you requested is not found." })
}


module.exports = notFoundHandler;