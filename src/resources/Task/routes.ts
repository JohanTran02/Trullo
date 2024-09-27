import express from "express"
import { createTask, getTask, getTasks, updateTask } from "./controller.ts";

// Möjlighet att skapa, läsa, uppdatera och ta bort en Task
/* 
Create Task
Read Task
Update Task
Delete Task

GET Retrieve all tasks api/tasks
GET Retrieve one task api/tasks/:taskId
UPDATE Update one task api/tasks/:taskId
DELETE Delete one task api/tasks/:taskId
POST Create one task api/tasks
*/

const router = express.Router();

router.get("", getTasks)
router.get("/:taskId", getTask)
router.put("/:taskId", updateTask)
router.post("", createTask)

export default router;