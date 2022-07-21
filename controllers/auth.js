const bcrypt = require("bcryptjs");
const Users = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const { BadRequestError, UnauthorizedError } = require("../errors");


const register = async (req, res) => {     
    const user = await Users.create({ ...req.body });
    const token = user.createJWT();
    return res
        .status(StatusCodes.CREATED)
        .json({ user: {name: user.name}, token});
}


const login = async(req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password){ throw new BadRequestError("Email/password cannot be empty.") }
        const user = await (await Users.findOne({ email }));
        if(!user) { throw new UnauthorizedError("No user has been found.")}
        const correct_password = await user.verifyPassword(password);
        if(!correct_password){throw new UnauthorizedError("Incorrect password.")}
        const token = user.createJWT();
        return res
                .status(StatusCodes.OK)
                .json({ user: { name: user.name }, token});
    } catch (error) {       
        return res.status(StatusCodes.BAD_REQUEST)
        .json({ msg: error.message});
    }
}


module.exports = {
    register,
    login
}