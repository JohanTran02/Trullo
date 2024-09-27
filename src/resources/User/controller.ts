import { User } from "../../models/models.ts";
import { Request, Response } from "express";
import { IUser } from "./types.ts";

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

async function getUsers(req: Request, res: Response) {
    try {
        const users: IUser[] = await User.find();
        return res.status(200).json(users);
    } catch (e) {
        console.error("Error details:", e);
        res.status(500).json({ e: "Database query failed!" });
    }
}

async function getUser(req: Request, res: Response) {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId);

        if (!user) res.status(404).send("User not found");
        else return res.status(200).json(user);

    } catch (e) {
        console.error("Error details:", e);
        res.status(500).json("Database query failed!");
    }
}

async function updateUser(req: Request, res: Response) {
    const { userId } = req.params;
    const updatedUser = req.body;
    // type TaskKey = keyof IUser;
    //TODO Error handling to check if the key exists in IUser 
    // const taskTypes: Record<TaskKey, string> = {}

    // for (const [key, value] of Object.entries(updatedTask)) {
    // }

    try {
        const user = await User.findByIdAndUpdate(userId, updatedUser, { new: true });

        if (!user) res.status(404).send("User not found");
        else return res.status(200).json(user);

    } catch (e) {
        console.error("Error details:", e);
        res.status(500).json("Database query failed!");
    }
}

async function createUser(req: Request, res: Response) {
    const createdUser: IUser = req.body;

    try {
        const user = await User.create(createdUser);

        return res.status(200).json(user);

    } catch (e) {
        console.error("Error details:", e);
        res.status(500).json("Database query failed!");
    }
}

async function deleteUser(req: Request, res: Response) {
    const { userId } = req.params;

    try {
        const user = await User.findByIdAndDelete(userId);

        if (!user) res.status(404).send("User not found");
        else return res.status(200).json(user);

    } catch (e) {
        console.error("Error details:", e);
        res.status(500).json("Database query failed!");
    }
}

export { getUser, getUsers, updateUser, deleteUser, createUser }