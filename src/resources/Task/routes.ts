import express from "express"
import { createTask, getTask, getTasks, updateTask, updateTaskTags } from "./controller.ts";
import { auth } from "../Auth/middleware.ts";

const router = express.Router();

router.use(auth);

router.get("", getTasks);
router.get("/:taskId", getTask);
router.put("/:taskId", updateTask);
router.put("/tags/:taskId", updateTaskTags);
router.post("", createTask);

export default router;