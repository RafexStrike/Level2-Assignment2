import { pool } from "../../configs/db";
import bcrypt from "bcryptjs";

//    CREATE USER (used by AUTH signup)
const createUser = async (payload: {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: "admin" | "customer";
}) => {
  const { name, email, password, phone, role } = payload;

  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `
    INSERT INTO users (name, email, password, phone, role)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, name, email, phone, role
    `,
    [name, email.toLowerCase(), hashedPassword, phone, role]
  );

  return result.rows[0];
};

//    GET ALL USERS (Admin only)
const getAllUsers = async () => {
  const result = await pool.query(`
    SELECT id, name, email, phone, role
    FROM users
    ORDER BY id ASC
  `);

  return result.rows;
};

//    GET USER BY ID
const getUserById = async (userId: number) => {
  const result = await pool.query(
    `
    SELECT id, name, email, phone, role
    FROM users
    WHERE id = $1
    `,
    [userId]
  );

  return result.rows[0];
};

//    GET USER BY EMAIL (used for LOGIN)
const getUserByEmail = async (email: string) => {
  const result = await pool.query(
    `
    SELECT *
    FROM users
    WHERE email = $1
    `,
    [email.toLowerCase()]
  );

  return result.rows[0];
};

//    UPDATE USER (Admin or Own Profile)
const updateUser = async (
  userId: number,
  payload: {
    name?: string;
    email?: string;
    phone?: string;
    role?: "admin" | "customer";
  }
) => {
  const fields = [];
  const values = [];
  let queryIndex = 1;

  for (const key in payload) {
    fields.push(`${key} = $${queryIndex}`);
    values.push((payload as any)[key]);
    queryIndex++;
  }

  const query = `
    UPDATE users
    SET ${fields.join(", ")}, updated_at = NOW()
    WHERE id = $${queryIndex}
    RETURNING id, name, email, phone, role
  `;

  const result = await pool.query(query, [...values, userId]);

  return result.rows[0];
};

//    DELETE USER (Admin only)
const deleteUser = async (userId: number) => {
  await pool.query(
    `
    DELETE FROM users
    WHERE id = $1
    `,
    [userId]
  );

  return true;
};

export const userService = {
  createUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
};
