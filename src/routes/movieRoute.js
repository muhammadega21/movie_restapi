import express from "express";
import {
  addMovie,
  deleteMovie,
  getAllMovie,
  updateMovie,
} from "../controllers/movieController.js";
import { protect } from "../middlewares/protect.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { movieSchema } from "../validators/movieValidators.js";

const router = express.Router();

router.use(protect);

router.get("/", getAllMovie);
router.post("/", validateRequest(movieSchema), addMovie);
router.patch("/:id", validateRequest(movieSchema.partial()), updateMovie);
router.delete("/:id", deleteMovie);

export default router;
