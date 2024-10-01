import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { asyncErrorHandler } from '../Error/asyncErrorHandler.ts';
import { CustomError } from '../Error/types.ts';
dotenv.config();

interface AuthenticatedRequest extends Request {
    user?: JwtPayload;
}

export const auth = asyncErrorHandler(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.replace("Bearer ", "");

    if (!token) return res.sendStatus(401);

    if (!process.env.JWT_SECRET) throw new CustomError('Missing JWT_SECRET in environment', 401);

    const user = jwt.verify(token, process.env.JWT_SECRET)

    req.user = user as JwtPayload;

    if (!req.user) throw new CustomError("You need to be logged in.", 403);

    next();
})