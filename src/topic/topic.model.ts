import mongoose from "mongoose";

const topicSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Topic name is required."],
      trim: true,
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
    langauge: {
      type: String,
      required: true,
      enum: ["hindi", "english", "hinglish"],
    },
  },
  { timestamps: true },
);

export const Topic = mongoose.model("Topic", topicSchema);
