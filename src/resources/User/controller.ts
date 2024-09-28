import { User } from "../../models/models.ts";
import { Request, Response } from "express";
import { IUser } from "./types.ts";
import { asyncErrorHandler } from "../Error/asyncErrorHandler.ts";
import { CustomError } from "../Error/types.ts";

// Möjlighet att skapa, läsa, uppdatera och ta bort en User
/* 
Create User
Read User
Update User
Delete User

GET Retrieve all users api/users
GET Retrieve one user api/users/:userId
UPDATE Update one user api/users/:userId
DELETE Delete one user api/users/:userId
POST Create one user api/users
*/

const getUsers = asyncErrorHandler(async (req: Request, res: Response) => {
    const users: IUser[] = await User.find();

    res.status(200).json({
        status: "success",
        data: users
    });
})

const getUser = asyncErrorHandler(async (req: Request, res: Response) => {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) throw new CustomError("User not found", 404);

    res.status(200).json({
        status: "success",
        data: user
    });
})

const updateUser = asyncErrorHandler(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const updatedUser = req.body;
    // type TaskKey = keyof IUser;
    //TODO Error handling to check if the key exists in IUser 
    // const taskTypes: Record<TaskKey, string> = {}

    // for (const [key, value] of Object.entries(updatedTask)) {
    // }

    const user = await User.findByIdAndUpdate(userId, updatedUser, { new: true, runValidators: true, context: "query" });

    if (!user) throw new CustomError("User not found", 404);

    res.status(200).json({
        status: "success",
        data: user
    });
})

const createUser = asyncErrorHandler(async (req: Request, res: Response) => {
    const createdUser: IUser = req.body;

    const user = await User.create(createdUser);

    res.status(200).json({
        status: "success",
        data: user
    });
})

const deleteUser = asyncErrorHandler(async (req: Request, res: Response) => {
    const { userId } = req.params;

    const user = await User.findByIdAndDelete(userId);

    if (!user) throw new CustomError("User not found", 404);

    res.status(200).json({
        status: "success",
        data: user
    });
})

export { getUser, getUsers, updateUser, deleteUser, createUser }