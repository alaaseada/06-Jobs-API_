const { type } = require("express/lib/response");
const mongoose = require("mongoose");
const jobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, "The company name is required."],
        maxLength: 50
    },
    position: {
        type: String,
        required: [true, "The position is required"],
        maxLength: 100
    },
    status: {
        type: String,
        enum: {
            values: ["Pending", "Interview", "Rejected"],
            message: "{VALUE} is invalid"
        },
        default: "Pending"
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "users",
        required: [true, "The creator is required."]
    }
}, {timestamps: true})


module.exports = mongoose.model('jobs', jobSchema);