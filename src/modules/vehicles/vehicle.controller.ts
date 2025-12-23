import { Request, Response } from "express";
import { vehicleService } from "./vehicle.service";

// POST /api/v1/vehicles
const createVehicle = async (req: Request, res: Response) => {
  try {
    const vehicle = await vehicleService.createVehicle(req.body);

    res.status(201).json({
      success: true,
      message: "Vehicle created successfully",
      data: vehicle,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// GET /api/v1/vehicles
const getAllVehicles = async (_req: Request, res: Response) => {
  try {
    const vehicles = await vehicleService.getAllVehicles();

    res.status(200).json({
      success: true,
      message:
        vehicles.length === 0
          ? "No vehicles found"
          : "Vehicles retrieved successfully",
      data: vehicles,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve vehicles",
    });
  }
};

// GET /api/v1/vehicles/:vehicleId
const getVehicleById = async (req: Request, res: Response) => {
  const vehicleId = Number(req.params.vehicleId);

  try {
    const vehicle = await vehicleService.getVehicleById(vehicleId);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Vehicle retrieved successfully",
      data: vehicle,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve vehicle",
    });
  }
};

// PUT /api/v1/vehicles/:vehicleId
const updateVehicle = async (req: Request, res: Response) => {
  const vehicleId = Number(req.params.vehicleId);

  try {
    const updatedVehicle = await vehicleService.updateVehicle(
      vehicleId,
      req.body
    );

    if (!updatedVehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Vehicle updated successfully",
      data: updatedVehicle,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE /api/v1/vehicles/:vehicleId
const deleteVehicle = async (req: Request, res: Response) => {
  const vehicleId = Number(req.params.vehicleId);

  try {
    await vehicleService.deleteVehicle(vehicleId);

    res.status(200).json({
      success: true,
      message: "Vehicle deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to delete vehicle",
    });
  }
};

export const vehicleController = {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
};
