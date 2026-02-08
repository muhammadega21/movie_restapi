import { prisma } from "../lib/prisma.js";

const addMovie = async ({
  title,
  overview,
  releaseYear,
  genres,
  runtime,
  posterUrl,
  createdBy,
}) => {
  const movie = await prisma.movie.create({
    data: {
      title,
      overview,
      releaseYear,
      genres,
      runtime,
      posterUrl,
      createdBy,
    },
  });

  return movie;
};

const updateMovie = async (movieId, data, userId) => {
  const movie = await prisma.movie.findUnique({
    where: { id: movieId },
  });

  if (!movie) {
    throw new Error("Movie not found");
  }

  if (movie.createdBy !== userId) {
    throw new Error("You are not authorized to update this movie");
  }

  const updatedMovie = await prisma.movie.update({
    where: { id: movieId },
    data,
  });

  return updatedMovie;
};

const deleteMovie = async (movieId, userId) => {
  const movie = await prisma.movie.findUnique({
    where: { id: movieId },
  });

  if (!movie) {
    throw new Error("Movie not found");
  }

  if (movie.createdBy !== userId) {
    throw new Error("Your are not authorized to delete this movie");
  }

  await prisma.movie.delete({
    where: { id: movieId },
  });

  return movie;
};

export { addMovie, updateMovie, deleteMovie };
