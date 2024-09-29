import express from "express"
import { addTaskToProject, createProject, getProject } from "../Project/controller.ts";

const router = express.Router();

router.put("/tasks", addTaskToProject);
router.get("", getProject);
router.post("", createProject);

export default router;