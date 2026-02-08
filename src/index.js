import express from "express";
import dotenv from "dotenv";
import movieRouter from "./routes/movieRoute.js";
import authRouter from "./routes/authRoutes.js";
import watchlistRouter from "./routes/watchlistRoute.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", authRouter);
app.use("/movies", movieRouter);
app.use("/watchlist", watchlistRouter);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

process.on("SIGTERM", (err) => {
  console.error("SIGTERM received, shutting down gracefully");
  server.close(async () => {
    await disconnectDB();
    process.exit(0);
  });
});
