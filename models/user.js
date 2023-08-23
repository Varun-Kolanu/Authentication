import { pool } from "../data/database.js";

export const createUserTable = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                user_id SERIAL PRIMARY KEY,
                user_name VARCHAR(20) NOT NULL,
                user_email VARCHAR(100) UNIQUE NOT NULL,
                user_password VARCHAR(73) NOT NULL,
                user_bio VARCHAR(1000),
                user_mobile VARCHAR(15)
            );
        `)
    } catch (error) {
        console.log(error);
    }
}