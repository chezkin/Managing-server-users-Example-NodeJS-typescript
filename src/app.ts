// Import packages onto app
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import hpp from "hpp";
import morgan from "morgan";
import rateLimit from "express-rate-limit";


import { verify } from "@/middleware/auth-middleware";
import { unless } from "./middleware/unless";

// Setup .env variables for app usage
dotenv.config();

// Import routes from the ./routes
import user from "@/routes/user-route";
import { connectDB } from "dataBase/conectMongoose";

// Setup constant variables
const PORT = process.env.PORT || 5000;
const RATE_TIME_LIMIT = Number(process.env.RATE_TIME_LIMIT) || 15;
const RATE_REQUEST_LIMIT = Number(process.env.RATE_REQUEST_LIMIT) || 100;

// Init express app
const app = express();

// Body parser
app.use(express.json());

// Detailed server logging
app.use(morgan("dev"));

// Limit rate of requests
// Alternatively, you can pass through specific routes for different limits based on route
app.use(
  rateLimit({
    windowMs: RATE_TIME_LIMIT * 60 * 1000,
    max: RATE_REQUEST_LIMIT,
  }),
);

// Enable CORS
app.use(cors());

// Security Headers
app.use(helmet());

// Secure against param pollutions
app.use(hpp());

app.use(unless(["/users/new-user","/users/"], verify));

// Setup routing
app.use("/users", user);

// Listen to specified port in .env or default 5000
connectDB().then((res) => {
  console.log('Connecting to mongodb');
  app.listen(PORT, () => {
    console.log(`Server is listening on: ${PORT}`);
  });
}).catch((err) => console.error(err))

