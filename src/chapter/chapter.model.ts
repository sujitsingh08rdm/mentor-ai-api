import mongoose from "mongoose";

const chapterSchema = new mongoose.Schema(
  {
    topic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
      required: [true, "Topic is required."],
    },
    name: {
      type: String,
      required: [true, "Chapter name is required."],
      trim: true,
      lowercase: true,
    },
    content: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
);

export const Chapter = mongoose.model("Chapter", chapterSchema);
