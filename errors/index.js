const CustomAPIError = require("./custom");
const NotFoundError = require("./not-found");
const BadRequestError = require("./bad-request");
const UnauthorizedError = require("./unauthorized");

module.exports = {
    CustomAPIError,
    NotFoundError,
    BadRequestError,
    UnauthorizedError
}