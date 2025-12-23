import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../configs";
import { userService } from "../users/user.service";

// signup 
const signup = async (payload: {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: "admin" | "customer";
}) => {
  const existingUser = await userService.getUserByEmail(payload.email);

  if (existingUser) {
    throw new Error("User already exists with this email");
  }

  const user = await userService.createUser(payload);

  return user;
};

// signin 
const signin = async (payload: { email: string; password: string }) => {
  const { email, password } = payload;

  const user = await userService.getUserByEmail(email);

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    config.jwtSecret as string,
    {
      expiresIn: "7d",
    }
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    },
  };
};

export const authService = {
  signup,
  signin,
};
