const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name."],
        minLength: 3,
        maxLength: 50
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "The email format is incorrect"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please provide a password."],
    }
});


UserSchema.pre('save', async function(){
    this.password = await bcrypt.hash(this.password, 10);
})

UserSchema.methods.createJWT = function() {
    return jwt.sign({ id: this._id.valueOf(), name:this.name }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME});
}

UserSchema.methods.verifyPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

module.exports = mongoose.model('users', UserSchema)