import { Router } from "express"
import { authRouter } from "./auth-router";
import { userRouter } from "./user-router";

export const routes = () => {
    const router = Router ();

    router.use("/auth", authRouter);
    router.use("/users", userRouter);

    return  router;
}