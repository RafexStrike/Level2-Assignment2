import { pool } from "../../configs/db";

// create vehicle
const createVehicle = async (payload: {
  vehicle_name: string;
  type: "car" | "bike" | "van" | "SUV";
  registration_number: string;
  daily_rent_price: number;
  availability_status: "available" | "booked";
}) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;

  const result = await pool.query(
    `
    INSERT INTO vehicles 
    (vehicle_name, type, registration_number, daily_rent_price, availability_status)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    `,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    ]
  );

  return result.rows[0];
};

// get all vehicles
const getAllVehicles = async () => {
  const result = await pool.query(`
    SELECT *
    FROM vehicles
    ORDER BY id ASC
  `);

  return result.rows;
};

// get vehicle by id
const getVehicleById = async (vehicleId: number) => {
  const result = await pool.query(
    `
    SELECT *
    FROM vehicles
    WHERE id = $1
    `,
    [vehicleId]
  );

  return result.rows[0];
};

// update vehicle
const updateVehicle = async (
  vehicleId: number,
  payload: Partial<{
    vehicle_name: string;
    type: "car" | "bike" | "van" | "SUV";
    registration_number: string;
    daily_rent_price: number;
    availability_status: "available" | "booked";
  }>
) => {
  const fields = [];
  const values = [];
  let index = 1;

  for (const key in payload) {
    fields.push(`${key} = $${index}`);
    values.push((payload as any)[key]);
    index++;
  }

  const query = `
    UPDATE vehicles
    SET ${fields.join(", ")}, updated_at = NOW()
    WHERE id = $${index}
    RETURNING *
  `;

  const result = await pool.query(query, [...values, vehicleId]);

  return result.rows[0];
};

// delete vehicle
const deleteVehicle = async (vehicleId: number) => {
  await pool.query(
    `
    DELETE FROM vehicles
    WHERE id = $1
    `,
    [vehicleId]
  );

  return true;
};

export const vehicleService = {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
};
