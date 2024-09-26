import { Task } from "../../models/models";
import { Request, Response } from "express";
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

async function GetTasks(req: Request, res: Response) {
    try {
        const tasks = await Task.find({ project: { _id: 1 } });
        return res.status(200).json({ tasks });
    } catch (e) {
        console.error("Error details:", e);
        res.status(500).json({ e: "Database query failed!" });
    }
}

