import "dotenv/config";
import pg from "pg";
const { Pool } = pg;


const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_DATABASE,
});

export default pool;
