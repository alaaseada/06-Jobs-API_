require("dotenv").config();
require("express-async-errors");
const express = require("express");
const connectDB = require("./db/connect");
const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");
const errorHandler  = require("./middleware/error-handler");
const notFoundHandler  = require("./middleware/not-found");
const authenticationMiddleware = require("./middleware/auth");
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const ratelimit = require("express-rate-limit");


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());
app.set('trust proxy', 1)
app.use(ratelimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
}));


app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticationMiddleware, jobsRouter);
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

