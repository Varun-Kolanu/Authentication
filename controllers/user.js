import bcrypt from "bcrypt";
import { sendJwt } from "../utils/sendJwt.js";
import ErrorHandler from "../middlewares/error.js";
import { pool } from "../data/database.js";

export const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        let user = (await pool.query("SELECT * FROM users WHERE user_email = $1;", [email])).rows;
        if (String(user) != String([])) return next(new ErrorHandler("User already exists", 400));
        const hashedPwd = await bcrypt.hash(password, 10);
        user = await pool.query("INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *", [username, email, hashedPwd]);
        sendJwt(user, res, "You have registered successfully", 201);
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        let user = (await pool.query("SELECT * FROM users WHERE user_email = $1;", [email])).rows;
        if (String(user) == String([])) return next(new ErrorHandler("User does not exists", 404));
        user = user[0]
        const isMatch = await bcrypt.compare(password, user.user_password);
        if (!isMatch) return next(new ErrorHandler("Invalid email or password"));
        sendJwt(user, res, `Welcome back ${user.user_name}`, 200);
    } catch (error) {
        next(error);
    }
}

export const myInfo = async (req, res) => {
    try {
        res.status(200)
            .json({
                success: true,
                user: req.user,
            })
    } catch (error) {
        next(error);
    }
}