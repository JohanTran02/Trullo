import { Request, Response } from "express";
import { asyncErrorHandler } from "../Error/asyncErrorHandler.ts";
import { Project } from "./models.ts";
import { Task } from "../Task/models.ts";
import { IProject } from "./types.ts";
import { CustomError } from "../Error/types.ts";

interface ProjectQuery {
    taskId?: string,
    projectId?: string,
}

const addTaskToProject = asyncErrorHandler(async (req: Request<{}, {}, { taskIds: string[] }, ProjectQuery>, res: Response) => {
    const { taskId, projectId } = req.query;
    const { taskIds } = req.body;
    let taskValue: string[] = [];

    if (!taskId || !projectId) throw new CustomError("Invalid query values", 400);

    if (taskIds.length < 1) {
        const task = await Task.findById(taskId);
        if (!task) throw new CustomError("Task not found", 404);
        taskValue.push(task.id);
    }

    taskValue = (await Task.aggregate([{ $project: { _id: 1 } }])).map((tag) => tag._id)

    const project = await Project.findById(projectId)

    if (!project) throw new CustomError("Project not found", 404);

    project.tasks.push(...taskValue)

    res.status(200).json({
        status: "success",
        data: project
    });
})

const getProject = asyncErrorHandler(async (req: Request, res: Response) => {
    const { projectId } = req.params

    const project = await Project.findById(projectId).populate({
        path: "tasks",
    });

    if (!project) throw new CustomError("Project not found", 404);

    res.status(200).json({
        status: "success",
        data: project
    });
})

const createProject = asyncErrorHandler(async (req: Request, res: Response) => {
    const createdProject: IProject = req.body;

    const project = await Project.create(createdProject)

    res.status(200).json({
        status: "success",
        data: project
    });
})

export { getProject, addTaskToProject, createProject }