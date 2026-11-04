import { Router } from "express";

import {
  createTopic,
  deleteTopic,
  fetchTopicById,
  fetchTopics,
  updateTopic,
} from "./topic.controller.js";
const topicRouter = Router();

topicRouter.get("/", fetchTopics);
topicRouter.post("/", createTopic);
topicRouter.get("/:id", fetchTopicById);
topicRouter.put("/:id", updateTopic);
topicRouter.delete("/:id", deleteTopic);

export default topicRouter;
