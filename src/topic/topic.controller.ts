import type { Request, Response } from "express";
import { Topic } from "./topic.model.js";

export async function createTopic(req: Request, res: Response) {
  try {
    const topic = await Topic.create(req.body);

    res.status(201).json({
      message: "Topic created successfully.",
      data: topic,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Failed to create topic:", error);
      res.status(500).json({
        message: error.message || "Failed to create topic.",
      });
    }
  }
}

export async function fetchTopics(_req: Request, res: Response) {
  try {
    const topics = await Topic.find().sort({ createdAt: -1 });

    res.status(200).json({
      message: "Topics fetched successfully.",
      data: topics,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Failed to fetch topics:", error);
      res.status(500).json({
        message: error.message || "Failed to fetch topics.",
      });
    }
  }
}

export async function fetchTopicById(req: Request, res: Response) {
  try {
    const topic = await Topic.findById(req.params.id);

    if (!topic) {
      throw new Error("Topic not found.");
    }

    res.status(200).json({
      message: "Topic fetched successfully.",
      data: topic,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Failed to fetch topic:", error);
      res.status(500).json({
        message: error.message || "Failed to fetch topic.",
      });
    }
  }
}

export async function updateTopic(req: Request, res: Response) {
  try {
    const topic = await Topic.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!topic) {
      throw new Error("Topic not found.");
    }

    res.status(200).json({
      message: "Topic updated successfully.",
      data: topic,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Failed to update topic:", error);
      res.status(500).json({
        message: error.message || "Failed to update topic.",
      });
    }
  }
}

export async function deleteTopic(req: Request, res: Response) {
  try {
    const topic = await Topic.findByIdAndDelete(req.params.id);

    if (!topic) {
      throw new Error("Topic not found.");
    }

    res.status(200).json({
      message: "Topic deleted successfully.",
      data: topic,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Failed to delete topic:", error);
      res.status(500).json({
        message: error.message || "Failed to delete topic.",
      });
    }
  }
}
