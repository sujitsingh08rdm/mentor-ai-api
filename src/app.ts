import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from "express";

import connectDB from "./config/db.js";
import chapterRouter from "./chapter/chapter.router.js";
import topicRouter from "./topic/topic.router.js";

const app = express();
const PORT = Number(process.env.PORT ?? 8080);
const DB_URL = process.env.DB_URL;

if (!Number.isInteger(PORT) || PORT < 1 || PORT > 65535) {
  throw new Error("PORT must be an integer between 1 and 65535.");
}

if (!DB_URL) {
  throw new Error("DB_URL is required. Add it to the API .env file.");
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/topic", topicRouter);
app.use("/chapter", chapterRouter);

app.get("/", (_request, response) => {
  response.status(200).json({ message: "AI Teacher API is running." });
});

app.use((_request, response) => {
  response.status(404).json({ message: "Route not found." });
});

async function startServer(dbUrl: string) {
  try {
    await connectDB(dbUrl);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1);
  }
}

await startServer(DB_URL);
