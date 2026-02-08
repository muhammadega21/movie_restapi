import { prisma } from "../lib/prisma.js";
import * as watchlistService from "../services/watchlistService.js";

const getAllWatchlist = async (req, res) => {
  try {
    const watchlists = await prisma.watchListItem.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      status: "success",
      results: watchlists.length,
      data: watchlists,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: `Error getting watchlists: ${error.message}`,
    });
  }
};

const addWatchlist = async (req, res) => {
  try {
    const userId = req.user.id;

    const { movieId, status, rating, notes } = req.body;

    const watchlist = await watchlistService.addWatchlist({
      movieId,
      status,
      rating,
      notes,
      userId,
    });

    res.status(201).json({
      status: "success",
      message: "Watchlist item added successfully",
      data: watchlist,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const deleteWatchlist = async (req, res) => {
  try {
    const watchlist = await watchlistService.deleteWatchlist(
      req.params.id,
      req.user.id,
    );

    res.status(200).json({
      status: "success",
      message: "Watchlist deleted successfully",
      data: watchlist,
    });
  } catch (error) {
    const statusCode = error.message.includes("not found")
      ? 404
      : error.message.includes("authorized")
        ? 403
        : 500;
    res.status(statusCode).json({
      status: "error",
      message: error.message,
    });
  }
};

export { getAllWatchlist, addWatchlist, deleteWatchlist };
