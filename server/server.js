//** PACKAGE IMPORTS */
import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import colors from "colors";
//** SECURITY PACKAGES */
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
//** API DOCUMENTATION PACKAGE */
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "swagger-jsdoc";
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

// Swagger api config
// Swagger api options
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Job Portal Application",
      description: "Node Express Job Portal Application",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const spec = swaggerDoc(options);

// ** REST OBJECT *
const app = express();

// ** MIDDLEWARES *
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
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

//** DOCUMENTATION ROUTES */
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(spec));

// ** VALIDATION MIDDLEWARE*
app.use(errorMiddleware);

// ** EVENT LISTENER *
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`.bgCyan);
});
