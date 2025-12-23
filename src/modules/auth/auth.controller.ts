import { Request, Response } from "express";
import { authService } from "./auth.service";

// POST /api/v1/auth/signup
const signup = async (req: Request, res: Response) => {
  try {
    const user = await authService.signup(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// POST /api/v1/auth/signin
const signin = async (req: Request, res: Response) => {
  try {
    const result = await authService.signin(req.body);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error: any) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

export const authController = {
  signup,
  signin,
};
