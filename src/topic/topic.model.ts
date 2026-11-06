import mongoose from "mongoose";

const topicSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Topic name is required."],
      trim: true,
      lowercase: true,
    },
    description: {
      type: String,
      trim: true,
    },
    level: {
      type: String,
      required: true,
      enum: ["beginner", "intermediate", "advanced"],
    },
    language: {
      type: String,
      required: [true, "Topic language is required."],
      enum: ["english", "hinglish"],
    },
    chapters: [String],
  },
  { timestamps: true },
);

export const TopicModel = mongoose.model("Topic", topicSchema);
