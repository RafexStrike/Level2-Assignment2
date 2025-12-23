import express from "express";
import { authController } from "./auth.controller";

const router = express.Router();

// POST /api/v1/auth/signup
router.post("/signup", authController.signup);

// POST /api/v1/auth/signin
router.post("/signin", authController.signin);

export const authRoutes = router;
