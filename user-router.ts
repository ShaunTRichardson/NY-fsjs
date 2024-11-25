import { Response, Router } from "express";
import { getUserId, jwtMiddleware } from "../utils/auth";
import { Request } from "express-jwt";

export const userRouter = Router();

userRouter.get("/me", jwtMiddleware(), (req: Request, res: Response) => {
    const userId = getUserId(req); 
    res.json({ userId })
});