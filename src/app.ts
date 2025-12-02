import express from "express";
import cors from "cors";
import { apiBaseRouter } from "./app/api/routes/api.routes";
import { errorHandler } from "./app/middlewares/errorHandler.middleware";
import { notFound } from "./app/middlewares/notFound.middleware";
import { checkConnection } from "./app/middlewares/checkconnection.middleware";
import { connectDB } from "./utils/dbConnection";
import mongoose from "mongoose";
import { MONGO_URI } from "./config";

export const app = express();

console.log("MONGO_URI:", MONGO_URI);
if (!MONGO_URI) {
  console.error("FATAL ERROR: MONGO_URI is not defined.");
}

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ Connected successfully to MongoDB container!");
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  });


app.use(
  cors({
    origin: "*",
    maxAge: 86400,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(checkConnection);
app.use("/api", apiBaseRouter);

app.use(notFound);

app.use(errorHandler);

