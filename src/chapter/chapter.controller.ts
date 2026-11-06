import type { Request, Response } from "express";
import { Chapter } from "./chapter.model.js";
import { getContentFromAi, PromptInterface } from "../ai/ai.service.js";
import {
  getSystemPropmtForChapter,
  getUserPropmtForChapter,
} from "./chapter.prompt.js";

export async function createChapter(req: Request, res: Response) {
  try {
    const body = req.body;
    const oldChapter = await Chapter.findOne({
      name: body.name.toLowerCase(),
      topic: body.topic,
    }).populate("topic");

    if (oldChapter) {
      res.json(oldChapter);
      return;
    }

    const prompt: PromptInterface = {
      systemPrompt: getSystemPropmtForChapter(),
      userPrompt: getUserPropmtForChapter(body.name),
    };

    const response = await getContentFromAi(prompt);

    const payload = {
      name: body.name,
      topic: body.topic,
      content: response,
    };

    const chapter = await Chapter.create(payload);
    await chapter.populate({ path: "topic" });
    res.send(chapter);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create chapter.";
    console.error("Failed to create chapter:", error);
    res.status(500).json({ message });
  }
}

export async function fetchChapters(_req: Request, res: Response) {
  try {
    const chapters = await Chapter.find()
      .sort({ createdAt: -1 })
      .populate("topic");

    res.status(200).json({
      message: "Chapters fetched successfully.",
      data: chapters,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch chapters.";
    console.error("Failed to fetch chapters:", error);
    res.status(500).json({ message });
  }
}

export async function fetchChapterByTopicId(req: Request, res: Response) {
  try {
    const chapter = await Chapter.findById(req.params.topicId);

    if (!chapter) {
      throw new Error("Chapter not found.");
    }

    res.status(200).json({
      message: "Chapter fetched successfully.",
      data: chapter,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch chapter.";
    console.error("Failed to fetch chapter:", error);
    res.status(500).json({ message });
  }
}

export async function updateChapter(req: Request, res: Response) {
  try {
    const chapter = await Chapter.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!chapter) {
      throw new Error("Chapter not found.");
    }

    res.status(200).json({
      message: "Chapter updated successfully.",
      data: chapter,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to update chapter.";
    console.error("Failed to update chapter:", error);
    res.status(500).json({ message });
  }
}

export async function deleteChapter(req: Request, res: Response) {
  try {
    const chapter = await Chapter.findByIdAndDelete(req.params.id);

    if (!chapter) {
      throw new Error("Chapter not found.");
    }

    res.status(200).json({
      message: "Chapter deleted successfully.",
      data: chapter,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to delete chapter.";
    console.error("Failed to delete chapter:", error);
    res.status(500).json({ message });
  }
}
