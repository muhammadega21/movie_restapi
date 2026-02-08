import express from "express";
import { protect } from "../middlewares/protect.js";
import {
  addWatchlist,
  deleteWatchlist,
  getAllWatchlist,
} from "../controllers/watchlistController.js";
import { watchlistSchema } from "../validators/watchlistValidators.js";
import { validateRequest } from "../middlewares/validateRequest.js";
const router = express.Router();

router.use(protect);

router.get("/", getAllWatchlist);
router.post("/", validateRequest(watchlistSchema), addWatchlist);
router.delete("/:id", deleteWatchlist);

export default router;
