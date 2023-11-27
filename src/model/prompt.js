import { Schema, model } from "mongoose";

const PromptSchema = Schema(
  {
    contentType: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    characters: { type: String, required: true, trim: true },
    tone: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Prompt", PromptSchema);
