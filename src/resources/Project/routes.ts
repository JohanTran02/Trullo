import express from "express"
import { addTaskToProject, createProject, getProject } from "../Project/controller.ts";
import { auth } from "../Auth/middleware.ts";

const router = express.Router();

router.use(auth)

router.put("/tasks", addTaskToProject);
router.get("", getProject);
router.post("", createProject);

export default router;