import { pool } from "../../configs/db";

// create booking
const createBooking = async (payload: {
  user_id: number;
  vehicle_id: number;
  start_date: string;
  end_date: string;
}) => {
  const { user_id, vehicle_id, start_date, end_date } = payload;

  // check vehicle availability
  const vehicleResult = await pool.query(
    `SELECT daily_rent_price, availability_status
     FROM vehicles
     WHERE id = $1`,
    [vehicle_id]
  );

  if (vehicleResult.rows.length === 0) {
    throw new Error("Vehicle not found");
  }

  if (vehicleResult.rows[0].availability_status !== "available") {
    throw new Error("Vehicle is not available");
  }

  // calculate total days
  const start = new Date(start_date);
  const end = new Date(end_date);

  const diffTime = end.getTime() - start.getTime();
  const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (totalDays <= 0) {
    throw new Error("Invalid booking date range");
  }

  const total_price =
    totalDays * Number(vehicleResult.rows[0].daily_rent_price);

  // transaction start
  await pool.query("BEGIN");

  try {
    const bookingResult = await pool.query(
      `
      INSERT INTO bookings
      (user_id, vehicle_id, start_date, end_date, total_price)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
      `,
      [user_id, vehicle_id, start_date, end_date, total_price]
    );

    await pool.query(
      `
      UPDATE vehicles
      SET availability_status = 'booked'
      WHERE id = $1
      `,
      [vehicle_id]
    );

    await pool.query("COMMIT");

    return bookingResult.rows[0];
  } catch (error) {
    await pool.query("ROLLBACK");
    throw error;
  }
};

// get all bookings (admin)
const getAllBookings = async () => {
  const result = await pool.query(`
    SELECT *
    FROM bookings
    ORDER BY id DESC
  `);

  return result.rows;
};

// get bookings for logged-in user
const getUserBookings = async (userId: number) => {
  const result = await pool.query(
    `
    SELECT *
    FROM bookings
    WHERE user_id = $1
    ORDER BY id DESC
    `,
    [userId]
  );

  return result.rows;
};

export const bookingService = {
  createBooking,
  getAllBookings,
  getUserBookings,
};
