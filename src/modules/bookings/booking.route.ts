import express from "express";
import { bookingController } from "./booking.controller";
import authMiddleware from "../../middlewares/auth.middleware";
import requireRole from "../../middlewares/role.middleware";

const router = express.Router();

// create booking (user)
router.post(
  "/",
  authMiddleware,
  requireRole("customer"),
  bookingController.createBooking
);

// get logged-in user's bookings
router.get(
  "/my-bookings",
  authMiddleware,
  requireRole("customer"),
  bookingController.getMyBookings
);

// get all bookings (admin)
router.get(
  "/",
  authMiddleware,
  requireRole("admin"),
  bookingController.getAllBookings
);

export const bookingRoutes = router;
