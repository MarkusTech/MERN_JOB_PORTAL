import express from "express";
const router = express.Router();
import { register, login } from "../controllers/authController.js";
import rateLimit from "express-rate-limit";

// IP Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  // store: ... , // Use an external store for more precise rate limiting
});

router.post("/register", limiter, register);
router.post("/login", limiter, login);

export default router;
