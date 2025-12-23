import express from "express";
import { userController } from "./user.controller";
import authMiddleware from "../../middlewares/auth.middleware";
import requireRole from "../../middlewares/role.middleware";


const router = express.Router();

// GET /api/v1/users (Admin only)
router.get(
  "/",
  authMiddleware,
  requireRole("admin"),
  userController.getAllUsers
);

// GET /api/v1/users/:userId (Admin or Own profile)
router.get(
  "/:userId",
  authMiddleware,
  userController.getUserById
);

// PUT /api/v1/users/:userId (Admin or Own profile)
router.put(
  "/:userId",
  authMiddleware,
  userController.updateUser
);

// DELETE /api/v1/users/:userId (Admin only)
router.delete(
  "/:userId",
  authMiddleware,
  requireRole("admin"),
  userController.deleteUser
);

export const userRoutes = router;
