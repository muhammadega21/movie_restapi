import { z } from "zod";

const movieSchema = z.object({
  title: z
    .string({
      error: (iss) =>
        iss.input === undefined
          ? "Title is required"
          : "Title must be a string",
    })
    .min(3, "Title must be at least 3 characters long"),
  overview: z.string("Overview must be a string").optional(),
  releaseYear: z.number({
    error: (iss) =>
      iss.input === undefined
        ? "Release year is required"
        : "Release year must be a number",
  }),
  genres: z.array(
    z.string({
      error: (iss) =>
        iss.input === undefined
          ? "Genres are required"
          : "Genres must be an array of strings",
    }),
  ),
  runtime: z.number({
    error: (iss) =>
      iss.input === undefined
        ? "Runtime is required"
        : "Runtime must be a number",
  }),
  posterUrl: z.string("Poster URL must be a string").optional(),
});

export { movieSchema };
