import { prisma } from "../lib/prisma.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

const register = async ({ email, name, password }) => {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("Email already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { email, name, password: hashedPassword },
  });

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    createdAt: user.createdAt,
  };
};

const login = async ({ email, password }) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  const token = await generateToken(user.id);

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  };
};

export { register, login };
