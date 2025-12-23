import { Request, Response } from "express";
import { userService } from "./user.service";

// GET /api/v1/users (Admin only)
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();

    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: users,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve users",
      errors: error.message,
    });
  }
};

// GET /api/v1/users/:userId
const getUserById = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId);

  try {
    const user = await userService.getUserById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      data: user,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve user",
      errors: error.message,
    });
  }
};

// PUT /api/v1/users/:userId (Admin or Own)
const updateUser = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId);
  const payload = req.body;

  try {
    const updatedUser = await userService.updateUser(userId, payload);

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to update user",
      errors: error.message,
    });
  }
};

// DELETE /api/v1/users/:userId (Admin only)
const deleteUser = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId);

  try {
    await userService.deleteUser(userId);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to delete user",
      errors: error.message,
    });
  }
};

export const userController = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
