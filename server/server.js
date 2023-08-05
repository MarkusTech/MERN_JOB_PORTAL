import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import colors from "colors";

// ** IMPORT CONNECTION *
import connectDB from "./config/db.js";

// ** IMPORT ROUTES *
import testRoutes from "./routes/testRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import jobsRoutes from "./routes/jobsRoutes.js";

// ** DOTENV *
dotenv.config();
const port = process.env.PORT;

// ** REST OBJECT *
const app = express();

// ** MIDDLEWARES *
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));

// ** DATABASE CONNECTION *
connectDB();

// ** HTTP GET REQUEST *
app.get("/", (req, res) => {
  res.send("Wenn Mark Recopelacion");
});

// ** API ROUTES *
app.use("/api/v1/test", testRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/job", jobsRoutes);

// ** VALIDATION MIDDLEWARE*
app.use(errorMiddleware);

// ** EVENT LISTENER *
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`.bgCyan);
});
