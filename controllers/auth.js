const bcrypt = require("bcryptjs");
const Users = require("../models/user");

const register = async (req, res) => {
    try {       
        const { name, password, email } = req.body;
        const hash = await bcrypt.hash(password, 10);
        await Users.create({ name, email, password: hash });
        return res.status(200).json({msg: `User -${name}- with email -${email}- has been successfully created.`});
    } catch (error) {
        return res.status(400).json({ msg: error.message });
    }
}
    

module.exports = {
    register
}