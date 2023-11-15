import { Router } from "express";
import {
  createPrompt,
  renderPrompts,
} from "../controller/prompt.controller";

const router = Router();

// Render all tasks
router.get("/prompts/", renderPrompts);

router.post("/prompt/send", createPrompt);

//router.get("/tasks/:id/toggleDone", taskToggleDone);

//router.get("/tasks/:id/edit", renderTaskEdit);

//router.post("/tasks/:id/edit", editTask);

//router.get("/tasks/:id/delete", deleteTask);

export default router;
