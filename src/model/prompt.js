import { Schema, model } from "mongoose";

const PromptSchema = Schema(
  {
    idea: { type: String, required: true, trim: true, unique: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("prompt", PromptSchema);
