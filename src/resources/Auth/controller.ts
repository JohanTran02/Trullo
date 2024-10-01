import { Request, Response } from "express";
import { asyncErrorHandler } from "../Error/asyncErrorHandler.ts";
import { CustomError } from "../Error/types.ts";
import bcrypt from "bcrypt"
import { User } from "../User/models.ts";
import jwt from "jsonwebtoken"
import { IUser } from "../User/types.ts";

const forgotPassword = asyncErrorHandler(async (req: Request, res: Response) => {
    const { email } = req.params;

    const user = await User.findOne({ email: email });

    if (!user) throw new CustomError("User not found", 404);

    if (!process.env.JWT_SECRET) {
        throw new CustomError('Missing JWT_SECRET in environment', 401);
    }

    if (!process.env.JWT_EXPIRES_IN) {
        throw new CustomError('Missing JWT_EXPIRES_IN in environment', 401);
    }

    if (!process.env.JWT_RESET_PASSWORD) {
        throw new CustomError('Missing JWT_RESET_PASSWORD in environment', 401);
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_RESET_PASSWORD, {
        expiresIn: process.env.JWT_EXPIRES_IN ?? '1h',
    });

    await user.updateOne({ resetToken: token });

    res.status(200).json({
        status: "success",
        data: { message: "Reset token sent", resetToken: token }
    });
})

const resetPassword = asyncErrorHandler(async (req: Request, res: Response) => {
    const { token, newPassword } = req.body;

    if (!process.env.JWT_RESET_PASSWORD) {
        throw new CustomError('Missing JWT_RESET_PASSWORD in environment', 401);
    }

    if (token) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        jwt.verify(token, process.env.JWT_RESET_PASSWORD);
        await User.findOneAndUpdate({ resetToken: token }, { password: hashedPassword })
    }
    else throw new CustomError("Authentication failed", 401);

    res.status(200).json({
        status: "success",
        data: { message: "Password sucessfully reset." }
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

    const token = jwt.sign({ _id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN ?? '1h',
    });

    res.status(200).json({
        status: "success",
        data: { token: token },
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

export {
    registerUser,
    loginUser,
    resetPassword,
    forgotPassword
}