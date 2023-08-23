import jwt from "jsonwebtoken";
import ErrorHandler from "./error.js";
import { pool } from "../data/database.js";

const isAuthenticated = async (req, res, next) => {
    try {
        const { token } = req.body;
        if (!token) return next(new ErrorHandler("Please Login first", 400))
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = (await pool.query("SELECT * FROM users WHERE user_email = $1", [decoded.email])).rows[0];
        next();
    } catch (error) {
        next(error);
    }
}

export default isAuthenticated;