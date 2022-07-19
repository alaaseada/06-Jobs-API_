require("dotenv").config();
require("express-async-errors");
const express = require("express");
const errorHandler  = require("./middleware/error-handler");
const notFoundHandler  = require("./middleware/not-found");
const connectDB = require("./db/connect");
const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', jobsRouter);
app.use(notFoundHandler);
app.use(errorHandler);


const start = async () => {
    try {       
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`The server is listening on port ${port}`)
        })
    } catch (error) {
        console.log(error);
    }
}

start();

