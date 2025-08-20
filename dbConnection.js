import postgres from "postgres";
import dotenv from "dotenv";
dotenv.config();

const URL = process.env.DB_URL;

export const sql = postgres(URL);
