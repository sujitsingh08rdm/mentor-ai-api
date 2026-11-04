import { Router } from "express";

import {
  createChapter,
  deleteChapter,
  fetchChapterByTopicId,
  fetchChapters,
  updateChapter,
} from "./chapter.controller.js";

const chapterRouter = Router();

chapterRouter.get("/", fetchChapters);
chapterRouter.post("/", createChapter);
chapterRouter.get("/:topicId", fetchChapterByTopicId);
chapterRouter.put("/:id", updateChapter);
chapterRouter.delete("/:id", deleteChapter);

export default chapterRouter;
