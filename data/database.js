import pg from 'pg';
const Pool = pg.Pool;
import { createUserTable } from "../models/user.js";
import { config } from "dotenv";

config();

export const pool = new Pool({
    "user": process.env.DB_USER,
    "host": process.env.DB_HOST,
    "database": process.env.DB_DATABASE,
    "password": process.env.DB_PASSWORD,
    "port": process.env.DB_PORT,
})

export const connectDB = () => {
    try {
        pool.connect(err => {
            if (err) return console.error(err);
            console.log("Connected!");
            createUserTable();
        });
    } catch (error) {
        console.log(error);
    }

}