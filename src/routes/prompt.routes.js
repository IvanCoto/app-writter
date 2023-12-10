import { Router } from "express";
import {
  createPrompt,
  renderPrompts,
} from "../controller/prompt.controller";

const router = Router();

// Render all tasks
router.get("/prompts/", renderPrompts);

router.post("/prompt/send", createPrompt);

export default router;
