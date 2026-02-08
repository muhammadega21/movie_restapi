import { z } from "zod";

const registerSchema = z.object({
  name: z
    .string({
      error: (iss) =>
        iss.input === undefined ? "Name is required" : "Name must be a string",
    })
    .min(3, "Name must be at least 3 characters long"),
  email: z
    .string({
      error: (iss) =>
        iss.input === undefined
          ? "Email is required"
          : "Email must be a string",
    })
    .email("Invalid email format"),
  password: z
    .string({
      error: (iss) =>
        iss.input === undefined
          ? "Password is required"
          : "Password must be a string",
    })
    .min(6, "Password must be at least 6 characters long"),
});

const loginSchema = z.object({
  email: z
    .string({
      error: (iss) =>
        iss.input === undefined
          ? "Email is required"
          : "Email must be a string",
    })
    .email("Invalid email format"),
  password: z.string({
    error: (iss) =>
      iss.input === undefined
        ? "Password is required"
        : "Password must be a string",
  }),
});

export { registerSchema, loginSchema };
