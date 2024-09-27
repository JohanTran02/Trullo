import { Task } from "../../models/models.ts";
import { Request, Response } from "express";
import { ITask } from "./types.ts";
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

async function getTasks(req: Request, res: Response) {
    try {
        const tasks: ITask[] = await Task.find();
        return res.status(200).json(tasks);
    } catch (e) {
        console.error("Error details:", e);
        res.status(500).json({ e: "Database query failed!" });
    }
}

async function getTask(req: Request, res: Response) {
    const { taskId } = req.params;

    try {
        const task = await Task.findById(taskId);

        if (!task) res.status(404).send("Task not found");
        else return res.status(200).json(task);

    } catch (e) {
        console.error("Error details:", e);
        res.status(500).json("Database query failed!");
    }
}

async function updateTask(req: Request, res: Response) {
    const { taskId } = req.params;
    const updatedTask = req.body;
    // type TaskKey = keyof ITask;
    //TODO Error handling to check if the key exists in ITask 
    // const taskTypes: Record<TaskKey, string> = {}

    // for (const [key, value] of Object.entries(updatedTask)) {
    // }

    try {
        const task = await Task.findByIdAndUpdate(taskId, updatedTask, { new: true });

        if (!task) res.status(404).send("Task not found");
        else return res.status(200).json(task);

    } catch (e) {
        console.error("Error details:", e);
        res.status(500).json("Database query failed!");
    }
}

async function createTask(req: Request, res: Response) {
    const createdTask: ITask = req.body;

    try {
        const task = await Task.create(createdTask);

        return res.status(200).json(task);

    } catch (e) {
        console.error("Error details:", e);
        res.status(500).json("Database query failed!");
    }
}

async function deleteTask(req: Request, res: Response) {
    const { taskId } = req.params;

    try {
        const task = await Task.findByIdAndDelete(taskId);

        if (!task) res.status(404).send("Task not found");
        else return res.status(200).json(task);

    } catch (e) {
        console.error("Error details:", e);
        res.status(500).json("Database query failed!");
    }
}

export { getTask, getTasks, updateTask, deleteTask, createTask }