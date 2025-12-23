import express, { Request, Response } from "express";
import initDB from "./configs/db";
import { userRoutes } from "./modules/users/user.route";
import { authRoutes } from "./modules/auth/auth.route";
import { vehicleRoutes } from "./modules/vehicles/vehicle.route";

const app = express();

app.use(express.json());

initDB();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello assignment 2!");
});

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/vehicles", vehicleRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.path,
  });
});

export default app;
