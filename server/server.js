import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import colors from "colors";

// ** IMPORT CONNECTION *
import connectDB from "./config/db.js";

// ** IMPORT ROUTES *

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

// ** EVENT LISTENER *
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`.bgCyan);
});
