const mongoose = require("mongoose");
const jobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    status: {
        type: String,
        enum: {
            values: ["Pending", "Interview", "Regected"],
            message: "{VALUE} you entered is not allowed."
        }
    },
    userId: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model('jobs', jobSchema);