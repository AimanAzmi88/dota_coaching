import { pool } from "../database/connection.js";

const query = `
CREATE TABLE IF NOT EXISTS slots (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    description VARCHAR(255),
    timestamp TIMESTAMP DEFAULT NOW(),
    book BOOLEAN DEFAULT FALSE,
    status BOOL DEFAULT FALSE,
    book_userId INTEGER REFERENCES users(id),
    position VARCHAR(255)
)`;

const slot = async () => {
    try {
        await pool.query(query);
        console.log("Slots table created successfully");
    } catch (error) {
        console.error("Error creating slots table:", error);
    }
}

export default slot;