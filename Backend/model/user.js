import { pool } from "../database/connection.js";

const query = `
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
`;


const createUserTable = async () => {
    try {
        await pool.query(query);
        console.log("User table created successfully");
    } catch (error) {
        console.log(error);
    }
}

export default createUserTable;