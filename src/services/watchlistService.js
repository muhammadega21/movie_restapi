import { prisma } from "../lib/prisma.js";

const addWatchlist = async ({ movieId, status, rating, notes, userId }) => {
  const movie = await prisma.movie.findUnique({
    where: { id: movieId },
  });

  if (!movie) {
    throw new Error("Movie not found");
  }

  const existingInWatchlist = await prisma.watchListItem.findUnique({
    where: { userId_movieId: { userId, movieId } },
  });

  if (existingInWatchlist) {
    return res.status(400).json({ error: "Movie already in watchlist" });
  }

  const watchlist = await prisma.watchListItem.create({
    data: {
      userId,
      movieId,
      status,
      rating,
      notes,
    },
  });

  return watchlist;
};

const deleteWatchlist = async (watchlistId, userId) => {
  const watchlist = await prisma.watchListItem.findUnique({
    where: { id: watchlistId },
  });

  if (!watchlist) {
    throw new Error("Watchlist item not found");
  }

  if (watchlist.userId !== userId) {
    throw new Error("Your are not authorized to delete this watchlist item");
  }

  await prisma.watchListItem.delete({
    where: { id: watchlistId },
  });

  return watchlist;
};

export { addWatchlist, deleteWatchlist };
