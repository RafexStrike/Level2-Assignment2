import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../configs";

interface JwtPayload {
  id: number;
  role: "admin" | "customer";
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    const token = authHeader.split(" ")[1];

    // const decoded = jwt.verify(token, config.jwtSecret as string) as JwtPayload;
    const decoded = jwt.verify(
      token as string,
      config.jwtSecret as string
    ) as JwtPayload;

    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    next();
  } catch (error: any) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default authMiddleware;
