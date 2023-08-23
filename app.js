import express from "express";
import userRouter from "./routes/user.js"
import cookieParser from "cookie-parser";
import {errorMiddleware} from "./middlewares/error.js";
import cors from "cors"

export const app = express();

//Using middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        // origin: [process.env.FRONTEND_URL],
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    }));

//using routes
app.use("/api/v1/users", userRouter );

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use(errorMiddleware);
