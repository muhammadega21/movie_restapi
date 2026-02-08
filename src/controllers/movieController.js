import { prisma } from "../lib/prisma.js";
import * as movieService from "../services/movieService.js";

const getAllMovie = async (req, res) => {
  try {
    const movies = await prisma.movie.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      status: "success",
      results: movies.length,
      data: movies,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: `Error getting movies: ${error.message}`,
    });
  }
};

const addMovie = async (req, res) => {
  try {
    const createdBy = req.user.id;

    const { title, overview, releaseYear, genres, runtime, posterUrl } =
      req.body;

    const movie = await movieService.addMovie({
      title,
      overview,
      releaseYear,
      genres,
      runtime,
      posterUrl,
      createdBy,
    });

    res.status(201).json({
      status: "success",
      message: "Movie added successfully",
      data: movie,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const updateMovie = async (req, res) => {
  try {
    const movie = await movieService.updateMovie(
      req.params.id,
      req.body,
      req.user.id,
    );

    res.status(200).json({
      status: "success",
      message: "Movie updated successfully",
      data: movie,
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

const deleteMovie = async (req, res) => {
  try {
    const movie = await movieService.deleteMovie(req.params.id, req.user.id);

    res.status(200).json({
      status: "success",
      message: "Movie deleted successfully",
      data: movie,
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

export { getAllMovie, addMovie, updateMovie, deleteMovie };
