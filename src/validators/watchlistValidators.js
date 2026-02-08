import { z } from "zod";

const watchlistSchema = z.object({
  status: z
    .enum(["PLANNED", "WATCHING", "COMPLETED", "DROPPED"], {
      error: () => ({
        message:
          "Status must be one of the following: PLANNED, WATCHING, COMPLETED, DROPPED",
      }),
    })
    .optional(),
  rating: z.coerce
    .number("Rating must be a number")
    .int("Rating must be an integer")
    .min(1, "Rating must be at least 1")
    .max(10, "Rating must be at most 10")
    .optional(),
  notes: z.string().optional(),
});

export { watchlistSchema };
