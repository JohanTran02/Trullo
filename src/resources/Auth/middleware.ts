import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { asyncErrorHandler } from '../Error/asyncErrorHandler.ts';
import { CustomError } from '../Error/types.ts';
import { IUser, roles } from '../User/types.ts';
dotenv.config();

export interface AuthenticatedRequest extends Request {
    user?: JwtPayload;
}

export const auth = asyncErrorHandler(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.replace("Bearer ", "");

    if (!token) throw new CustomError("You need to be logged in.", 401);

    if (!process.env.JWT_SECRET) throw new CustomError('Missing JWT_SECRET in environment', 401);

    const user = jwt.verify(token, process.env.JWT_SECRET)

    req.user = user as JwtPayload;

    if (!req.user) throw new CustomError("Not authorized. Log in.", 403);

    next();
})

export const authCheck = (permission: "read" | "write" | "delete" | "update") => {
    return asyncErrorHandler(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        const user = req.user as IUser;
        if (roles[user.role].includes(permission)) next()
        else {
            throw new CustomError("Only Admins are authorized.", 403)
        }
    })
}