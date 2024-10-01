import { Request, Response } from "express";
import { IUser } from "./types.ts";
import { asyncErrorHandler } from "../Error/asyncErrorHandler.ts";
import { CustomError } from "../Error/types.ts";
import { User } from "./models.ts";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt"

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

const registerUser = asyncErrorHandler(async (req: Request, res: Response) => {
    const { name, email, password }: IUser = req.body;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.findOne({ email: email });

    if (user) throw new CustomError("User with email already exists.", 400);

    const newUser = await User.create({ name: name, email: email, password: hashedPassword });

    res.status(201).json({
        status: "success",
        data: newUser
    });
})

const loginUser = asyncErrorHandler(async (req: Request, res: Response) => {
    let now = new Date();
    now.setTime(now.getTime() + 1 * 3600 * 1000);

    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) throw new CustomError("User not found", 400);

    const correctPassword = await bcrypt.compare(password, user.password);

    if (!correctPassword) throw new CustomError("Wrong email or password.", 400);

    if (!process.env.JWT_SECRET) {
        throw new CustomError('Missing JWT_SECRET in environment', 401);
    }
    if (!process.env.JWT_EXPIRES_IN) {
        throw new CustomError('Missing JWT_EXPIRES_IN in environment', 401);
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '1h',
    });

    res.status(200).json({
        status: "success",
        token: token,
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

export { getUser, getUsers, updateUser, deleteUser, registerUser, loginUser }