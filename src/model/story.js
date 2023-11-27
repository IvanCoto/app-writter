import { Schema, model } from "mongoose";

const StorySchema = Schema(
  {
    content: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Story", StorySchema);
