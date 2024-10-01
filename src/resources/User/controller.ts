import { Request, Response } from "express";
import { IUser } from "./types.ts";
import { asyncErrorHandler } from "../Error/asyncErrorHandler.ts";
import { CustomError } from "../Error/types.ts";
import { User } from "./models.ts";
import bcrypt from "bcrypt"
import { AuthenticatedRequest } from "../Auth/middleware.ts";

const getUsers = asyncErrorHandler(async (req: Request, res: Response) => {
    const users: IUser[] = await User.find();

    res.status(200).json({
        status: "success",
        data: users
    });
})

const currentUser = asyncErrorHandler(async (req: AuthenticatedRequest, res: Response) => {
    const user = req.user;

    res.status(200).json({
        status: "success",
        data: user
    });
})

const getUser = asyncErrorHandler(async (req: Request, res: Response) => {
    const { email } = req.params;

    const user = await User.findOne({ email: email });

    if (!user) throw new CustomError("User not found", 404);

    res.status(200).json({
        status: "success",
        data: user
    });
})

const updateUser = asyncErrorHandler(async (req: Request, res: Response) => {
    const { email } = req.params;
    const { name, email: newEmail, password } = req.body
    // Error handling to check if the key exists in IUser ?

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.findOneAndUpdate({ email: email }, { name: name, email: newEmail, password: hashedPassword }, { new: true, runValidators: true });

    if (!user) throw new CustomError("User not found", 404);

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

export { getUser, getUsers, updateUser, currentUser, deleteUser }