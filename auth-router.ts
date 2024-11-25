import {Router, Request, Response} from "express";
import { UserModel } from "../models/user-models"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { ENV } from "../utils/env-vars";

export const authRouter = Router();

authRouter.post("/login", async (req: Request, res: Response) => {
    const {username, password} = req.body;

    const user = await UserModel.findOne({ username });

    if(!user){
        return res.status(400).send("Invalid user");
    }

    const passwordCorrect = await bcrypt.compare(password, user.password);

    if(!passwordCorrect){
        return res.status(400).send("Invalid user");
    }

    const payload = {
        username, userId: user._id
    };

    const token = jwt.sign(payload, ENV.JWT_SECRET);

    res.json({ token });
})

authRouter.post("/register", async (req: Request, res: Response) => {
    const {username, password} = req.body;

    const user = await UserModel.findOne({ username });

    if(user){
        return res.status(400).send("Username Exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await UserModel.create({username, password: hashedPassword})

    res.status(201).send("User Created");
})