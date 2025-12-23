import { Request, Response } from "express";
import { bookingService } from "./booking.service";

// POST /api/v1/bookings
const createBooking = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    const booking = await bookingService.createBooking({
      user_id: userId,
      vehicle_id: req.body.vehicle_id,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
    });

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: booking,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// GET /api/v1/bookings (admin)
const getAllBookings = async (_req: Request, res: Response) => {
  try {
    const bookings = await bookingService.getAllBookings();

    res.status(200).json({
      success: true,
      message: "Bookings retrieved successfully",
      data: bookings,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve bookings",
    });
  }
};

// GET /api/v1/bookings/my-bookings (user)
const getMyBookings = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    const bookings = await bookingService.getUserBookings(userId);

    res.status(200).json({
      success: true,
      message:
        bookings.length === 0
          ? "No bookings found"
          : "Bookings retrieved successfully",
      data: bookings,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve bookings",
    });
  }
};

export const bookingController = {
  createBooking,
  getAllBookings,
  getMyBookings,
};
