import { Task } from "../../models/models.ts";
import { Request, Response } from "express";
import { ITask } from "./types.ts";
import { asyncErrorHandler } from "../Error/asyncErrorHandler.ts";
import { CustomError } from "../Error/types.ts";

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

const getTasks = asyncErrorHandler(async (req: Request, res: Response) => {
    const tasks: ITask[] = await Task.find();

    res.status(200).json({
        status: "success",
        data: tasks
    });
})

const getTask = asyncErrorHandler(async (req: Request, res: Response) => {
    const { taskId } = req.params;

    const task = await Task.findById(taskId);

    if (!task) throw new CustomError("Task not found", 404);

    res.status(200).json({
        status: "success",
        data: task
    });
})

const updateTask = asyncErrorHandler(async (req: Request, res: Response) => {
    const { taskId } = req.params;
    const updatedTask: ITask = req.body;
    // type TaskKey = keyof ITask;
    //TODO Error handling to check if the key exists in ITask 
    // const taskTypes: Record<TaskKey, string> = {}

    // for (const [key, value] of Object.entries(updatedTask)) {
    // }
    const task = await Task.findByIdAndUpdate(taskId, updatedTask, { new: true, runValidators: true, context: "query" });

    if (!task) throw new CustomError("Task not found", 404);

    res.status(200).json({
        status: "success",
        data: task
    });
})

const createTask = asyncErrorHandler(async (req: Request, res: Response) => {
    const createdTask: ITask = req.body;

    const task = await Task.create(createdTask);

    res.status(200).json({
        status: "success",
        data: task
    });
})

const deleteTask = asyncErrorHandler(async (req: Request, res: Response) => {
    const { taskId } = req.params;
    const task = await Task.findByIdAndDelete(taskId);

    if (!task) throw new CustomError("Task not found", 404);

    res.status(200).json({
        status: "success",
        data: task
    });
})

export { getTask, getTasks, updateTask, deleteTask, createTask }