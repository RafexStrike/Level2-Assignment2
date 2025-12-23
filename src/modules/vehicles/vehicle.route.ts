import express from "express";
import { vehicleController } from "./vehicle.controller";
import authMiddleware from "../../middlewares/auth.middleware";
import requireRole from "../../middlewares/role.middleware";

const router = express.Router();

// POST /api/v1/vehicles (Admin only)
router.post(
  "/",
  authMiddleware,
  requireRole("admin"),
  vehicleController.createVehicle
);

// GET /api/v1/vehicles (Public)
router.get("/", vehicleController.getAllVehicles);

// GET /api/v1/vehicles/:vehicleId (Public)
router.get("/:vehicleId", vehicleController.getVehicleById);

// PUT /api/v1/vehicles/:vehicleId (Admin only)
router.put(
  "/:vehicleId",
  authMiddleware,
  requireRole("admin"),
  vehicleController.updateVehicle
);

// DELETE /api/v1/vehicles/:vehicleId (Admin only)
router.delete(
  "/:vehicleId",
  authMiddleware,
  requireRole("admin"),
  vehicleController.deleteVehicle
);

export const vehicleRoutes = router;
