import express from "express"
import cors from "cors";
import mongoose from "mongoose"
import { routes } from "./src/routes/_router";
import { authRouter } from "./src/routes/auth-router";
import { ENV } from "./src/utils/env-vars";

const app = express ();;

app.use(cors());
app.use(express.json());
app.use(routes());
app.use('/auth', authRouter);

(async () => {
    await mongoose.connect(ENV.MONGODB_URI);

    const port = ENV.PORT;

    app.listen(port, () => {
        console.log(`Server running: http://localhost:${port}`);

    })
})();