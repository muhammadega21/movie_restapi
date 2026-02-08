import express from "express";
import { login, logout, me, register } from "../controllers/authController.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { loginSchema, registerSchema } from "../validators/authValidators.js";
import { protect } from "../middlewares/protect.js";

const router = express.Router();

router.post("/register", validateRequest(registerSchema), register);
router.post("/login", validateRequest(loginSchema), login);
router.post("/logout", logout);

router.get("/me", protect, me);

export default router;
